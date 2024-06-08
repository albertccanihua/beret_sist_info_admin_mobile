import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IPaginateEntityApiResponse } from 'src/app/interfaces/paginate-entity-api-response.interface';
import { Pagination } from 'src/app/classes/pagination.class';
import { ActionSheet } from 'src/app/classes/action-sheet.class';
import { IApiResponse } from 'src/app/interfaces/api-response.interface';
import { Toast } from 'src/app/classes/toast.class';
import {
    IGetManagementTypesApiResponse
} from 'src/app/interfaces/management-type/get-management-types-api-response.interface';
import { ManagementTypeService } from 'src/app/services/management-type/management-type.service';
import { AlertController, LoadingController } from '@ionic/angular';
import { IPatientsApiFilters } from 'src/app/interfaces/patient/patients-api-filters.interface';
import { PatientFiltersModel } from 'src/app/models/patients-filters.model';
import { PatientService } from 'src/app/services/patient/patient.service';
import { IListPatientsApiResponse } from 'src/app/interfaces/patient/list-patients-api-response.interface';
import { IPatient } from 'src/app/interfaces/patient/patient.interface';
import { EventBusService } from 'src/app/services/service-bus.service';
import { TreatmentService } from 'src/app/services/treatment/treatment.service';
import { IGetTreatmentsApiResponse } from 'src/app/interfaces/treatment/get-treatments-api-response.interface';
import { ITreatmentsApiFilters } from 'src/app/interfaces/treatment/treatments-api-filters.interface';
import { TreatmentRequestService } from 'src/app/services/treatment/treatment-request.service';
import { UserService } from 'src/app/services/user/user.service.service';

@Component({
    selector: 'app-patients',
    templateUrl: './patients.component.html',
    styleUrls: ['./patients.component.scss'],
})
export class PatientsComponent implements OnInit {

    toast: Toast;
    loading: any;

    patientsGeneralSegment: IPaginateEntityApiResponse<IListPatientsApiResponse[]> = { data: [], page: 1, total_data: 0, total_page: 0 };
    treatmentsRequestsSegment: IGetTreatmentsApiResponse[] = [];
    pagination: Pagination = new Pagination();
    noMoreData = false;
    actionSheet: ActionSheet = new ActionSheet();
    isModalAdvanceFiltersOpen = false;
    patientFiltersGeneralSegment: IPatientsApiFilters;
    patientFiltersRequestsSegment: ITreatmentsApiFilters;
    segmentValue: string = 'requests';

    typeDocuments: IGetManagementTypesApiResponse[] = [];
    typeFinancing: IGetManagementTypesApiResponse[] = [];

    userRole: string = '';

    authenticatedUserId: number = 0;

    constructor(
        private _patientService: PatientService,
        private _treatmentService: TreatmentService,
        private _treatmentRequestService: TreatmentRequestService,
        private _managementTypeService: ManagementTypeService,
        private router: Router,
        private alertController: AlertController,
        private loadingCtrl: LoadingController,
        private _eventBusService: EventBusService,
        private userService: UserService
    ) {
        this.patientFiltersGeneralSegment = new PatientFiltersModel();
        this.patientFiltersGeneralSegment = { ...this.pagination.getAsObject() };
        this.patientFiltersRequestsSegment = new PatientFiltersModel();
        this.patientFiltersRequestsSegment = { ...this.pagination.getAsObject() };
        this.toast = new Toast();

        this._eventBusService.on('back-to-patients-list').subscribe(data => {
            this.segmentValue = data;
            this.initialSearch();
        });
    }

    async ngOnInit() {
        this.getPatientList();
        this.getManagementTypes();

        this.userService.currentUserRole.subscribe(role => {
            this.userRole = role;

            if (this.userRole === 'Administrador') {
                this.segmentValue = 'requests';
            }
        })


        this.userService.currentUserId.subscribe(id => {
            this.authenticatedUserId = id
        })
    }

    trackById(index: number, item: any): number {
        return item.id;
    }

    changeSegment(event: any) {
        this.segmentValue = event.detail.value;
        this.initialSearch();
    }

    private getPatientList(event = 'reload') {
        console.log(this.segmentValue);
        const filters = this.segmentValue === 'general' ? this.patientFiltersGeneralSegment : this.patientFiltersRequestsSegment;

        this._patientService.list(filters).subscribe(response => {

            if (this.segmentValue === 'general') {
                if (event === 'reload') this.patientsGeneralSegment = response.result;
                if (event === 'infinite') response.result.data.forEach((item) => this.patientsGeneralSegment.data.push(item));
                this.noMoreData = response.result.total_page < this.pagination.limit || response.result.total_page === 0;
                this.pagination.page++;
            }

        });
    }

    private getTreatmentsList() {
        this._treatmentService.get({
            patient_document_number: this.patientFiltersRequestsSegment.patient_document_number
        }).subscribe(response => {
            this.treatmentsRequestsSegment = response.result;

            if (response.result.length > 0) {
                this._treatmentRequestService.create({
                    user_creator: this.authenticatedUserId,
                    patient: response.result[0].patient.id
                }).subscribe(response => {
                    console.log('I did');
                })
            }
        });
    }

    private deletePatient(id: string) {
        this._patientService.delete(id).subscribe((response: IApiResponse<IPatient>) => {
            if (response.code === 200) {
                this.toast.success().deleteMessage().show();
                this.initialSearch();
            }
        });
    }

    initialSearch() {
        this.isModalAdvanceFiltersOpen = false;
        this.pagination.reset();
        this.patientFiltersGeneralSegment = { ...this.patientFiltersGeneralSegment, page: this.pagination.page, limit: this.pagination.limit };
        this.getPatientList();
    }

    initialSearchRequests() {
        this.patientFiltersRequestsSegment = { ...this.patientFiltersRequestsSegment };
        this.getTreatmentsList();
    }

    cleanFilters() {
        this.isModalAdvanceFiltersOpen = false;
        this.pagination.reset();
        this.patientFiltersGeneralSegment = { page: this.pagination.page, limit: this.pagination.limit };
        this.getPatientList();
    }

    private getManagementTypes() {
        this._managementTypeService.get({ type: 'type_document', status: 1 }).subscribe((data: IApiResponse<IGetManagementTypesApiResponse[]>) => {
            this.typeDocuments = data.result;
        });
        this._managementTypeService.get({ type: 'type_financing', status: 1 }).subscribe((data: IApiResponse<IGetManagementTypesApiResponse[]>) => {
            this.typeFinancing = data.result;
        });
    }

    handleSearchbar(event: any) {
        const query = event.target.value.toLowerCase();
        this.patientFiltersGeneralSegment.document_number = query;
        this.initialSearch();
    }

    handleSearchbarRequest(event: any) {
        const query = event.target.value.toLowerCase();
        this.patientFiltersRequestsSegment.patient_document_number = query;
    }

    handleRefresh(event: any) {
        setTimeout(() => {
            this.initialSearch();
            event.target.complete();
        }, 2000);
    }

    onIonInfinite(event: any) {
        if (this.noMoreData) {
            event.target.disabled = true;
        } else {
            this.patientFiltersGeneralSegment = { ...this.patientFiltersGeneralSegment, page: this.pagination.page, limit: this.pagination.limit };
            this.getPatientList('infinite');
            setTimeout(() => event.target.complete(), 1000);
        }
    }

    setOpen(isOpen: boolean, id?: any) {
        this.actionSheet.clearButtons();
        this.actionSheet.isActionSheetOpen = isOpen;

        this.actionSheet
            .setCancelAction()
            .setDeleteAction('Eliminar', () => {
                this.presentDeleteButton(id);
            })
            .setUpdateAction('Actualizar', () => {
                this.router.navigateByUrl(`/mobile/patients/update/${id}`);
            })
            .setUpdateAction('Asignar tratamiento', () => {
                this.router.navigateByUrl(`/mobile/patients/assign-packet/${id}`);
            })
            .setViewAction('Ver', () => {
                this.router.navigateByUrl(`/mobile/patients/view/${id}`);
            });
    }

    setOpenRequests(isOpen: boolean, id?: any) {
        this.actionSheet.clearButtons();
        this.actionSheet.isActionSheetOpen = isOpen;

        this.actionSheet
            .setCancelAction()
            .setViewAction('Ver', () => {
                this.router.navigateByUrl(`/mobile/patients/view-treatment/${id}`);
            });
    }

    setOpenModalAdvanceFilters(value: boolean): void {
        this.isModalAdvanceFiltersOpen = value;
    }

    async presentDeleteButton(id: string) {
        const alert = await this.alertController.create({
            header: '¿Está seguro?',
            subHeader: 'El paciente se eliminará permanentemente',
            buttons: [{
                text: 'Cancelar',
                role: 'cancel',
                handler: () => {
                },
            },
            {
                text: 'Confirmar',
                role: 'confirm',
                handler: () => {
                    this.deletePatient(id);
                },
            }],
        });

        await alert.present();
    }

    async showLoading() {
        this.loading = await this.loadingCtrl.create({
            message: 'Espere por favor...'
        });
    }

    signOut() {
        localStorage.clear();
        this.router.navigateByUrl('/mobile/auth')
    }

}
