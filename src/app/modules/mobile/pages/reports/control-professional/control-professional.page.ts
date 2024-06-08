import { Component, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { IonModal } from '@ionic/angular/common';
import { Toast } from 'src/app/classes/toast.class';
import { DateHelper } from 'src/app/helpers/date.helper';
import { Item } from 'src/app/interfaces/item.interface';
import { IGetTreatmentAssistanceFollowUpApiResponse } from 'src/app/interfaces/treatment/get-treatment-assistance-follow-up-api-response.interface';
import { IGetUsersApiResponse } from 'src/app/interfaces/user/get-users-api-response.interface';
import { TreatmentAssistancesService } from 'src/app/services/treatment/treatment-assistances.service';
import { UserService } from 'src/app/services/user/user.service.service';

@Component({
  selector: 'app-control-professional',
  templateUrl: './control-professional.page.html',
  styleUrls: ['./control-professional.page.scss'],
})
export class ControlProfessionalPage implements OnInit, OnChanges {

  toast: Toast;
  @ViewChild('modal', { static: true }) modal!: IonModal;

  argSelectedDate: string = '';
  argSelectedUser: string = '';

  selectedModalName: string = 'Seleccionar profesional';
  users: IGetUsersApiResponse[] = [];

  treatmentFollowUp: IGetTreatmentAssistanceFollowUpApiResponse = { treatments_per_day: 0, treatments_per_month: 0 };

  constructor(
    private _userService: UserService,
    private _treatmentAssistanceService: TreatmentAssistancesService
  ) {
    this.toast = new Toast();
  }

  ngOnInit(): void {
    this.getUsers();
    this.argSelectedDate = DateHelper.getCurrentFormatDate();
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log('');
  }

  private getUsers() {
    this._userService.get({}).subscribe((response) => {
      this.users = response.result;
    })
  }

  getTreatmentAssistanceFollowUp() {

    if (this.argSelectedUser === '') {
      this.toast.warning().setMessage('Debe seleccionar un profesional!').show();
      return;
    }

    this._treatmentAssistanceService.getFollowUp({
      date_care: this.argSelectedDate,
      profesional: this.argSelectedUser
    }).subscribe((response) => {
      this.treatmentFollowUp = response.result;
      this.treatmentFollowUp.treatments_per_day = this.divideInteger(response.result.treatments_per_day);
      this.toast.success().setMessage('Reporte cargado correctamente!').show();
    });
  }

  private divideInteger(number: number) {
    if (number == 0) return 0;
    if (number == 1) return 1;


    let half = number / 2;
    return Math.ceil(half);
  }

  pickTime(value: any) {
    this.argSelectedDate = value.split('T')[0];
  }

  onVariableChange(newValue: number) {
    this.modal.dismiss();
    const user = this.users.filter((user) => user.id === newValue)[0];
    this.selectedModalName = `${user.name} ${user.paternal_surname}`;
  }

}
