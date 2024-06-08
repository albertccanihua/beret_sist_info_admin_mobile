import { Component, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { IonModal } from '@ionic/angular/common';
import { Toast } from 'src/app/classes/toast.class';
import { DateHelper } from 'src/app/helpers/date.helper';
import { Item } from 'src/app/interfaces/item.interface';
import { IGetTreatmentRequestFollowUpApiResponse } from 'src/app/interfaces/treatment/get-treatment-request-follow-up-api-response.interface';
import { IGetUsersApiResponse } from 'src/app/interfaces/user/get-users-api-response.interface';
import { TreatmentRequestService } from 'src/app/services/treatment/treatment-request.service';
import { UserService } from 'src/app/services/user/user.service.service';

@Component({
  selector: 'app-follow-up',
  templateUrl: './follow-up.page.html',
  styleUrls: ['./follow-up.page.scss'],
})
export class FollowUpPage implements OnInit, OnChanges {

  toast: Toast;
  @ViewChild('modal', { static: true }) modal!: IonModal;

  // Args
  argSelectedDate: string = '';
  argSelectedUser: string = '';

  selectedModalName: string = 'Seleccionar profesional';
  users: IGetUsersApiResponse[] = [];

  treatmentFollowUp: IGetTreatmentRequestFollowUpApiResponse = { requests_per_day: 0, requests_per_month: 0 };

  constructor(
    private _userService: UserService,
    private _treatmentRequestService: TreatmentRequestService
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

  getTreatmentRequestFollowUp() {
    this._treatmentRequestService.getFollowUp({ created_at: this.argSelectedDate }).subscribe((response) => {
      this.treatmentFollowUp = response.result;
      this.toast.success().setMessage('Reporte cargado correctamente!').show();
    });
  }

  pickTime(value: any) {
    this.argSelectedDate = value.split('T')[0];
  }

  onVariableChange(newValue: string) {
    this.modal.dismiss();
    this.selectedModalName = 'Hola';
    console.log('Nuevo valor de myVariable:', newValue);
  }
}
