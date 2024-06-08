import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Toast } from 'src/app/classes/toast.class';
import { IApiResponse } from 'src/app/interfaces/api-response.interface';
import { IGetManagementTypesApiResponse } from 'src/app/interfaces/management-type/get-management-types-api-response.interface';
import { IShowUserApiResponse } from 'src/app/interfaces/user/show-user-api-response.interface';
import { IUser } from 'src/app/interfaces/user/user.interface';
import { UpdateUserModel } from 'src/app/models/update-user.model';
import { ManagementTypeService } from 'src/app/services/management-type/management-type.service';
import { UserService } from 'src/app/services/user/user.service.service';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.page.html',
  styleUrls: ['./update-user.page.scss'],
})
export class UpdateUserPage implements OnInit {

  toast: Toast;
  loading: boolean = false;

  userId: string = '';
  user: IShowUserApiResponse | undefined;
  userToUpdate: UpdateUserModel;

  typeDocuments: IGetManagementTypesApiResponse[] = [];
  typeGenders: IGetManagementTypesApiResponse[] = [];
  typeRoles: IGetManagementTypesApiResponse[] = [];

  constructor(
    private _userService: UserService,
    private _managementTypeService: ManagementTypeService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.userToUpdate = new UpdateUserModel();
    this.toast = new Toast();
  }

  ngOnInit() {
    this.showUser();
    this.getManagementTypes();
  }

  private showUser() {
    this.loading = true;
    this.route.paramMap.subscribe(params => {
      this.userId = params.get('id')!;
      this._userService.show(params.get('id')!).subscribe((data: IApiResponse<IShowUserApiResponse>) => {
        this.user = data.result;
        this.userToUpdate = this.user as UpdateUserModel;
      });
    });
    this.loading = false;
  }

  private getManagementTypes() {
    this._managementTypeService.get({ type: 'type_document', status: 1 }).subscribe((data: IApiResponse<IGetManagementTypesApiResponse[]>) => {
      this.typeDocuments = data.result;
    });
    this._managementTypeService.get({ type: 'type_gender', status: 1 }).subscribe((data: IApiResponse<IGetManagementTypesApiResponse[]>) => {
      this.typeGenders = data.result;
    });
    this._managementTypeService.get({ type: 'type_role', status: 1 }).subscribe((data: IApiResponse<IGetManagementTypesApiResponse[]>) => {
      this.typeRoles = data.result;
    });
  }

  updateUser() {

    if (
      this.userToUpdate.type_document.id == 0 ||
      this.userToUpdate.document_number == '' ||
      this.userToUpdate.name == '' ||
      this.userToUpdate.paternal_surname == '' ||
      this.userToUpdate.dob == '' ||
      this.userToUpdate.type_gender.id == 0 ||
      this.userToUpdate.username == '' ||
      this.userToUpdate.type_role.id == 0
    ) {
      this.toast.warning().incompleteDataMessage().show();
      return;
    }

    try {
      this.loading = true;

      this._userService.update({
        id: this.userId,
        document_number: this.userToUpdate.document_number,
        dob: this.userToUpdate.dob,
        name: this.userToUpdate.name,
        paternal_surname: this.userToUpdate.paternal_surname,
        maternal_lastname: this.userToUpdate.maternal_lastname,
        email: this.userToUpdate.email,
        phone_number: this.userToUpdate.phone_number,
        username: this.userToUpdate.username,
        password: this.userToUpdate.password,
        status: true,
        type_document: this.userToUpdate.type_document.id,
        type_gender: this.userToUpdate.type_gender.id,
        type_role: this.userToUpdate.type_role.id
      }).subscribe((response: IApiResponse<IUser>) => {
        if (response.code === 200) {
          this.toast.success().updateMessage().show();
          this.router.navigateByUrl('/mobile/tabs/users');
        };

        this.loading = false;
      })
    } catch (error) {
      this.loading = false;
    }
  }
}
