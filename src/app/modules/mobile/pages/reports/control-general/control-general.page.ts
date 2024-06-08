import { Component, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { IonModal } from '@ionic/angular/common';
import { Toast } from 'src/app/classes/toast.class';
import { DateHelper } from 'src/app/helpers/date.helper';
import { Item } from 'src/app/interfaces/item.interface';
import { IGetTreatmentAssistanceFollowUpApiResponse } from 'src/app/interfaces/treatment/get-treatment-assistance-follow-up-api-response.interface';
import { IGetTreatmentRequestFollowUpApiResponse } from 'src/app/interfaces/treatment/get-treatment-request-follow-up-api-response.interface';
import { IGetUsersApiResponse } from 'src/app/interfaces/user/get-users-api-response.interface';
import { TreatmentAssistancesService } from 'src/app/services/treatment/treatment-assistances.service';
import { TreatmentRequestService } from 'src/app/services/treatment/treatment-request.service';
import { UserService } from 'src/app/services/user/user.service.service';

@Component({
  selector: 'app-control-general',
  templateUrl: './control-general.page.html',
  styleUrls: ['./control-general.page.scss'],
})
export class ControlGeneralPage implements OnInit, OnChanges {

  toast: Toast;
  @ViewChild('modal', { static: true }) modal!: IonModal;

  argSelectedDate: string = '';

  treatmentAssistanceFollowUp: IGetTreatmentAssistanceFollowUpApiResponse = { treatments_per_day: 0, treatments_per_month: 0 };
  treatmentRequestFollowUp: IGetTreatmentRequestFollowUpApiResponse = { requests_per_day: 0, requests_per_month: 0 };

  constructor(
    private _treatmentAssistanceService: TreatmentAssistancesService,
    private _treatmentRequestService: TreatmentRequestService
  ) {
    this.toast = new Toast();
  }

  ngOnInit(): void {
    this.argSelectedDate = DateHelper.getCurrentFormatDate();
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log('');
  }

  getTreatmentRequestFollowUp() {
    this._treatmentAssistanceService.getFollowUp({ created_at: this.argSelectedDate }).subscribe((response) => {
      this.treatmentAssistanceFollowUp = response.result;
    });
    this._treatmentRequestService.getFollowUp({ created_at: this.argSelectedDate }).subscribe((response) => {
      this.treatmentRequestFollowUp = response.result;
    });

    this.toast.success().setMessage('Reporte cargado correctamente!').show();
  }

  pickTime(value: any) {
    this.argSelectedDate = value.split('T')[0];
  }
}
