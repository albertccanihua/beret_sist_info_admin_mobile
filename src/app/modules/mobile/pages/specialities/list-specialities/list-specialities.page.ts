import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IPaginateEntityApiResponse } from 'src/app/interfaces/paginate-entity-api-response.interface';
import { Pagination } from 'src/app/classes/pagination.class';
import { ActionSheet } from 'src/app/classes/action-sheet.class';
import { IApiResponse } from 'src/app/interfaces/api-response.interface';
import { Toast } from 'src/app/classes/toast.class';
import { IGetManagementTypesApiResponse } from 'src/app/interfaces/management-type/get-management-types-api-response.interface';
import { ManagementTypeService } from 'src/app/services/management-type/management-type.service';
import { AlertController, LoadingController } from '@ionic/angular';
import { IListSpecialitiesApiResponse } from 'src/app/interfaces/speciality/list-specialities-api-response.interface';
import { SpecialityService } from 'src/app/services/speciality/speciality.service';
import { ISpecialitiesApiFilters } from 'src/app/interfaces/speciality/specialities-api-filters.interface';
import { SpecialitiesFiltersModel } from 'src/app/models/specialities-filters.model';
import { ISpeciality } from 'src/app/interfaces/speciality/speciality.interface';
import { EventBusService } from 'src/app/services/service-bus.service';

@Component({
  selector: 'app-list-specialities',
  templateUrl: './list-specialities.page.html',
  styleUrls: ['./list-specialities.page.scss'],
})
export class ListSpecialitiesPage implements OnInit {

  toast: Toast;
  loading: boolean = false;

  specialities: IPaginateEntityApiResponse<IListSpecialitiesApiResponse[]> = { data: [], page: 1, total_data: 0, total_page: 0 };
  pagination: Pagination = new Pagination();
  noMoreData = false;
  actionSheet: ActionSheet = new ActionSheet();
  isModalAdvanceFiltersOpen = false;
  specialityFilters: ISpecialitiesApiFilters;

  typeDocuments: IGetManagementTypesApiResponse[] = [];
  typeRoles: IGetManagementTypesApiResponse[] = [];

  constructor(
    private _specialititesService: SpecialityService,
    private _managementTypeService: ManagementTypeService,
    private router: Router,
    private alertController: AlertController,
    private _eventBusService: EventBusService
  ) {
    this.specialityFilters = new SpecialitiesFiltersModel();
    this.specialityFilters = { ...this.pagination.getAsObject() };
    this.toast = new Toast();

    this._eventBusService.on('speciality-updated').subscribe((data: string) => this.initialSearch())
    this._eventBusService.on('speciality-created').subscribe((data: string) => this.initialSearch())
  }

  async ngOnInit() {
    this.getSpecialitiesList();
    this.getManagementTypes();
  }

  trackById(index: number, item: any): number {
    return item.id;
  }

  private getSpecialitiesList(event = 'reload') {
    this.loading = true;

    this._specialititesService.list(this.specialityFilters).subscribe(response => {
      if (event === 'reload') this.specialities = response.result;
      if (event === 'infinite') response.result.data.forEach((item) => this.specialities.data.push(item));

      this.noMoreData = response.result.total_page < this.pagination.limit || response.result.total_page === 0;
      this.pagination.page++;
    });

    this.loading = false;
  }

  private deleteSpeciality(id: string) {
    this.loading = true;

    this._specialititesService.delete(id).subscribe((response: IApiResponse<ISpeciality>) => {
      if (response.code === 200) {
        this.toast.success().deleteMessage().show();
        this.initialSearch();
      }
    });

    this.loading = false;
  }

  initialSearch() {
    this.isModalAdvanceFiltersOpen = false;
    this.pagination.reset();
    this.specialityFilters = { ...this.specialityFilters, page: this.pagination.page, limit: this.pagination.limit };
    this.getSpecialitiesList();
  }

  cleanFilters() {
    this.isModalAdvanceFiltersOpen = false;
    this.pagination.reset();
    this.specialityFilters = { page: this.pagination.page, limit: this.pagination.limit };
    this.getSpecialitiesList();
  }

  private getManagementTypes() {
    this._managementTypeService.get({ type: 'type_document' }).subscribe((data: IApiResponse<IGetManagementTypesApiResponse[]>) => {
      this.typeDocuments = data.result;
    });
    this._managementTypeService.get({ type: 'type_role' }).subscribe((data: IApiResponse<IGetManagementTypesApiResponse[]>) => {
      this.typeRoles = data.result;
    });
  }

  handleSearchbar(event: any) {
    const query = event.target.value.toLowerCase();
    this.specialityFilters.code = query;
    this.initialSearch();
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
      this.specialityFilters = { ...this.specialityFilters, page: this.pagination.page, limit: this.pagination.limit };
      this.getSpecialitiesList('infinite');
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
        this.router.navigateByUrl(`/mobile/specialities/update/${id}`);
      });
  }

  setOpenModalAdvanceFilters(value: boolean): void {
    this.isModalAdvanceFiltersOpen = value;
  }

  async presentDeleteButton(id: string) {
    const alert = await this.alertController.create({
      header: '¿Está seguro?',
      subHeader: 'La especialidad se eliminará permanentemente',
      buttons: [{
        text: 'Cancelar',
        role: 'cancel',
        handler: () => { },
      },
      {
        text: 'Confirmar',
        role: 'confirm',
        handler: () => {
          this.deleteSpeciality(id);
        },
      }],
    });

    await alert.present();
  }

}
