import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user/user.service.service';
import { IPaginateEntityApiResponse } from 'src/app/interfaces/paginate-entity-api-response.interface';
import { IListUserApiResponse } from 'src/app/interfaces/user/list-users-api-response.interface';
import { IUsersApiFilters } from 'src/app/interfaces/user/users-api-filters.interface';
import { Pagination } from 'src/app/classes/pagination.class';
import { ActionSheet } from 'src/app/classes/action-sheet.class';
import { IApiResponse } from 'src/app/interfaces/api-response.interface';
import { IUser } from 'src/app/interfaces/user/user.interface';
import { Toast } from 'src/app/classes/toast.class';
import { IGetManagementTypesApiResponse } from 'src/app/interfaces/management-type/get-management-types-api-response.interface';
import { ManagementTypeService } from 'src/app/services/management-type/management-type.service';
import { UserFiltersModel } from 'src/app/models/user-filters.model';
import { AlertController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {

  toast: Toast;
  loading: boolean = false;

  users: IPaginateEntityApiResponse<IListUserApiResponse[]> = { data: [], page: 1, total_data: 0, total_page: 0 };
  pagination: Pagination = new Pagination();
  noMoreData = false;
  actionSheet: ActionSheet = new ActionSheet();
  isModalAdvanceFiltersOpen = false;
  userFilters: IUsersApiFilters;

  typeDocuments: IGetManagementTypesApiResponse[] = [];
  typeRoles: IGetManagementTypesApiResponse[] = [];

  constructor(
    private _userService: UserService,
    private _managementTypeService: ManagementTypeService,
    private router: Router,
    private alertController: AlertController,
    private loadingCtrl: LoadingController,
  ) {
    this.userFilters = new UserFiltersModel();
    this.userFilters = { ...this.pagination.getAsObject() };
    this.toast = new Toast();
  }

  async ngOnInit() {
    this.getUserList();
    this.getManagementTypes();
  }

  trackById(index: number, item: any): number {
    return item.id;
  }

  private getUserList(event = 'reload') {
    this.loading = true;

    this._userService.list(this.userFilters).subscribe(response => {
      if (event === 'reload') this.users = response.result;
      if (event === 'infinite') response.result.data.forEach((item) => this.users.data.push(item));

      this.noMoreData = response.result.total_page < this.pagination.limit || response.result.total_page === 0;
      this.pagination.page++;

    });

    this.loading = false;
  }

  private deleteUser(id: string) {
    this.loading = true;

    this._userService.delete(id).subscribe((response: IApiResponse<IUser>) => {
      if (response.code === 200) {
        let userName = response.result.name + ' ' + response.result.paternal_surname;
        this.toast.success().setMessage('El usuario ' + userName + ' se eliminó correctamente').show();
        this.initialSearch();

      }
    });

    this.loading = false;
  }

  initialSearch() {
    this.isModalAdvanceFiltersOpen = false;
    this.pagination.reset();
    this.userFilters = { ...this.userFilters, page: this.pagination.page, limit: this.pagination.limit };
    this.getUserList();
  }

  cleanFilters() {
    this.isModalAdvanceFiltersOpen = false;
    this.pagination.reset();
    this.userFilters = { page: this.pagination.page, limit: this.pagination.limit };
    this.getUserList();
  }

  private getManagementTypes() {
    this._managementTypeService.get({ type: 'type_document', status: 1 }).subscribe((data: IApiResponse<IGetManagementTypesApiResponse[]>) => {
      this.typeDocuments = data.result;
    });
    this._managementTypeService.get({ type: 'type_role', status: 1 }).subscribe((data: IApiResponse<IGetManagementTypesApiResponse[]>) => {
      this.typeRoles = data.result;
    });
  }

  handleSearchbar(event: any) {
    const query = event.target.value.toLowerCase();
    this.userFilters.document_number = query;
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
      this.userFilters = { ...this.userFilters, page: this.pagination.page, limit: this.pagination.limit };
      this.getUserList('infinite');
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
        this.router.navigateByUrl(`/mobile/users/update/${id}`);
      })
      .setViewAction('Ver', () => {
        this.router.navigateByUrl(`/mobile/users/view/${id}`);
      });
  }

  setOpenModalAdvanceFilters(value: boolean): void {
    this.isModalAdvanceFiltersOpen = value;
  }

  async presentDeleteButton(id: string) {
    const alert = await this.alertController.create({
      header: '¿Está seguro?',
      subHeader: 'El usuario se eliminará permanentemente',
      buttons: [{
        text: 'Cancelar',
        role: 'cancel',
        handler: () => { },
      },
      {
        text: 'Confirmar',
        role: 'confirm',
        handler: () => {
          this.deleteUser(id);
        },
      }],
    });

    await alert.present();
  }

  signOut() {
    localStorage.clear();
    this.router.navigateByUrl('/mobile/auth')
  }
}