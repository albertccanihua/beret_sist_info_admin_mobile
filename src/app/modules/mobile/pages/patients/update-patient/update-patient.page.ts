import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Toast } from 'src/app/classes/toast.class';
import { IApiResponse } from 'src/app/interfaces/api-response.interface';
import { IGetManagementTypesApiResponse } from 'src/app/interfaces/management-type/get-management-types-api-response.interface';
import { IPatient } from 'src/app/interfaces/patient/patient.interface';
import { IShowPatientApiResponse } from 'src/app/interfaces/patient/show-patient-api-response.interface';
import { UpdatePatientModel } from 'src/app/models/update-patient.model';
import { ManagementTypeService } from 'src/app/services/management-type/management-type.service';
import { PatientService } from 'src/app/services/patient/patient.service';
import { EventBusService } from 'src/app/services/service-bus.service';

@Component({
  selector: 'app-update-patient',
  templateUrl: './update-patient.page.html',
  styleUrls: ['./update-patient.page.scss'],
})
export class UpdatePatientPage implements OnInit {

  toast: Toast;

  patientId: string = '';
  patient: IShowPatientApiResponse | undefined;
  patientToUpdate: UpdatePatientModel;

  typeDocuments: IGetManagementTypesApiResponse[] = [];
  typeGenders: IGetManagementTypesApiResponse[] = [];
  typeFinancing: IGetManagementTypesApiResponse[] = [];

  constructor(
    private _patientService: PatientService,
    private _managementTypeService: ManagementTypeService,
    private route: ActivatedRoute,
    private router: Router,
    private _eventBusService: EventBusService
  ) {
    this.patientToUpdate = new UpdatePatientModel();
    this.toast = new Toast();
  }

  ngOnInit() {
    this.showUser();
    this.getManagementTypes();
  }

  private showUser() {
    this.route.paramMap.subscribe(params => {
      this.patientId = params.get('id')!;
      this._patientService.show(params.get('id')!).subscribe((data: IApiResponse<IShowPatientApiResponse>) => {
        this.patient = data.result;
        this.patientToUpdate = this.patient as UpdatePatientModel;
      });
    });
  }

  backToList() {
    this._eventBusService.emit('back-to-patients-list', 'general')
    this.router.navigateByUrl('/mobile/tabs/patients');
  }

  private getManagementTypes() {
    this._managementTypeService.get({ type: 'type_document', status: 1 }).subscribe((data: IApiResponse<IGetManagementTypesApiResponse[]>) => {
      this.typeDocuments = data.result;
    });
    this._managementTypeService.get({ type: 'type_gender', status: 1 }).subscribe((data: IApiResponse<IGetManagementTypesApiResponse[]>) => {
      this.typeGenders = data.result;
    });
    this._managementTypeService.get({ type: 'type_financing', status: 1 }).subscribe((data: IApiResponse<IGetManagementTypesApiResponse[]>) => {
      this.typeFinancing = data.result;
    });
  }

  updatePatient() {
    if (
      this.patientToUpdate.type_document.id == 0 ||
      this.patientToUpdate.document_number == '' ||
      this.patientToUpdate.name == '' ||
      this.patientToUpdate.paternal_surname == '' ||
      this.patientToUpdate.type_gender.id == 0 ||
      this.patientToUpdate.type_financing.id == 0
    ) {
      this.toast.warning().incompleteDataMessage().show();
      return;
    }

    try {
      this._patientService.update({
        id: this.patientId,
        document_number: this.patientToUpdate.document_number,
        dob: this.patientToUpdate.dob,
        name: this.patientToUpdate.name,
        paternal_surname: this.patientToUpdate.paternal_surname,
        maternal_lastname: this.patientToUpdate.maternal_lastname,
        email: this.patientToUpdate.email,
        phone_number: this.patientToUpdate.phone_number,
        status: this.patientToUpdate.status,
        type_document: this.patientToUpdate.type_document.id,
        type_gender: this.patientToUpdate.type_gender.id,
        type_financing: this.patientToUpdate.type_financing.id
      }).subscribe((response: IApiResponse<IPatient>) => {
        if (response.code === 200) {
          this.toast.success().updateMessage().show();
          this.backToList();
        };
      })
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
    }
  }
}
