import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IPaginateEntityApiResponse } from 'src/app/interfaces/paginate-entity-api-response.interface';
import { Pagination } from 'src/app/classes/pagination.class';
import { ActionSheet } from 'src/app/classes/action-sheet.class';
import { IApiResponse } from 'src/app/interfaces/api-response.interface';
import { Toast } from 'src/app/classes/toast.class';
import { ManagementTypeService } from 'src/app/services/management-type/management-type.service';
import { AlertController, LoadingController } from '@ionic/angular';
import { SpecialitiesFiltersModel } from 'src/app/models/specialities-filters.model';
import { IListManagementTypesApiResponse } from 'src/app/interfaces/management-type/list-management-types-api-response.interface';
import { IManagementType } from 'src/app/interfaces/management-type/management-type.interface';
import { IManagementTypesApiFilters } from 'src/app/interfaces/management-type/management-types-api-filters.interface';
import { EventBusService } from 'src/app/services/service-bus.service';


@Component({
  selector: 'app-list-management-types',
  templateUrl: './list-management-types.page.html',
  styleUrls: ['./list-management-types.page.scss'],
})
export class ListManagementTypesPage {

  toast: Toast;
  loading: any;

  managementTypes: IPaginateEntityApiResponse<IListManagementTypesApiResponse[]> = { data: [], page: 1, total_data: 0, total_page: 0 };
  pagination: Pagination = new Pagination();
  noMoreData = false;
  actionSheet: ActionSheet = new ActionSheet();
  managementTypeFilters: IManagementTypesApiFilters;

  constructor(
    private _managementTypeService: ManagementTypeService,
    private router: Router,
    private alertController: AlertController,
    private loadingCtrl: LoadingController,
    private _eventBusService: EventBusService
  ) {
    this.managementTypeFilters = new SpecialitiesFiltersModel();
    this.managementTypeFilters = { ...this.pagination.getAsObject() };
    this.toast = new Toast();

    this._eventBusService.on('management-type-created').subscribe((data: string) => this.initialSearch());
    this._eventBusService.on('management-type-updated').subscribe((data: string) => this.initialSearch());
  }

  trackById(index: number, item: any): number {
    return item.id;
  }

  private getManagementTypeList(event = 'reload') {
    this._managementTypeService.list(this.managementTypeFilters).subscribe(response => {
      if (event === 'reload') this.managementTypes = response.result;
      if (event === 'infinite') response.result.data.forEach((item) => this.managementTypes.data.push(item));

      this.noMoreData = response.result.total_page < this.pagination.limit || response.result.total_page === 0;
      this.pagination.page++;
    });
  }

  private deactivateManagementType(id: string) {
    this._managementTypeService.update({ id: id, status: false }).subscribe((response: IApiResponse<IManagementType>) => {
      if (response.code === 200) {
        this.toast.success().deactivateMessage().show();
        this.initialSearch();
      }
    });
  }

  initialSearch() {
    this.pagination.reset();
    this.managementTypeFilters = { ...this.managementTypeFilters, page: this.pagination.page, limit: this.pagination.limit };
    this.getManagementTypeList();
  }

  handleChange(e: any) {
    this.pagination.reset();
    this.managementTypeFilters = { ...this.managementTypeFilters, type: e.detail.value, page: this.pagination.page, limit: this.pagination.limit };
    this.getManagementTypeList();
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
      this.managementTypeFilters = { ...this.managementTypeFilters, page: this.pagination.page, limit: this.pagination.limit };
      this.getManagementTypeList('infinite');
      setTimeout(() => event.target.complete(), 1000);
    }
  }

  setOpen(isOpen: boolean, id?: any) {
    this.actionSheet.clearButtons();
    this.actionSheet.isActionSheetOpen = isOpen;

    this.actionSheet
      .setCancelAction()
      .setUpdateAction('Actualizar', () => {
        this.router.navigateByUrl(`/mobile/management-types/update/${id}`);
      });
  }

  async showLoading() {
    this.loading = await this.loadingCtrl.create({
      message: 'Espere por favor...'
    });
  }

}
