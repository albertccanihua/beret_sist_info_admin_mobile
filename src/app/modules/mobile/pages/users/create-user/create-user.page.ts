import { Component, OnInit } from '@angular/core';
import { Toast } from 'src/app/classes/toast.class';
import { IApiResponse } from 'src/app/interfaces/api-response.interface';
import { IGetManagementTypesApiResponse } from 'src/app/interfaces/management-type/get-management-types-api-response.interface';
import { IUser } from 'src/app/interfaces/user/user.interface';
import { CreateUserModel } from 'src/app/models/create-user.model';
import { ManagementTypeService } from 'src/app/services/management-type/management-type.service';
import { UserService } from 'src/app/services/user/user.service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.page.html',
  styleUrls: ['./create-user.page.scss'],
})
export class CreateUserPage implements OnInit {

  toast: Toast;
  loading: boolean = false;

  userToCreate: CreateUserModel;

  typeDocuments: IGetManagementTypesApiResponse[] = [];
  typeGenders: IGetManagementTypesApiResponse[] = [];
  typeRoles: IGetManagementTypesApiResponse[] = [];

  constructor(
    private _userService: UserService,
    private _managementTypeService: ManagementTypeService,
    private router: Router
  ) {
    this.userToCreate = new CreateUserModel();
    this.toast = new Toast();
  }

  ngOnInit() {
    this.getManagementTypes();
  }

  private getManagementTypes() {
    this.loading = true;

    this._managementTypeService.get({ type: 'type_document', status: 1 }).subscribe((data: IApiResponse<IGetManagementTypesApiResponse[]>) => {
      this.typeDocuments = data.result;
    });
    this._managementTypeService.get({ type: 'type_gender', status: 1 }).subscribe((data: IApiResponse<IGetManagementTypesApiResponse[]>) => {
      this.typeGenders = data.result;
    });
    this._managementTypeService.get({ type: 'type_role', status: 1 }).subscribe((data: IApiResponse<IGetManagementTypesApiResponse[]>) => {
      this.typeRoles = data.result;
    });

    this.loading = false;
  }

  createUser() {

    if (
      this.userToCreate.type_document.id == 0 ||
      this.userToCreate.document_number == '' ||
      this.userToCreate.name == '' ||
      this.userToCreate.paternal_surname == '' ||
      this.userToCreate.dob == '' ||
      this.userToCreate.type_gender.id == 0 ||
      this.userToCreate.username == '' ||
      this.userToCreate.password == '' ||
      this.userToCreate.confirm_password == '' ||
      this.userToCreate.type_role.id == 0
    ) {
      this.toast.warning().incompleteDataMessage().show();
      return;
    }

    if (this.userToCreate.password !== this.userToCreate.confirm_password) {
      this.toast.warning().setMessage('Las contraseñas no coinciden!').show();
      return;
    }


    try {
      this.loading = true;

      this._userService.create({
        document_number: this.userToCreate.document_number,
        dob: this.userToCreate.dob,
        name: this.userToCreate.name,
        paternal_surname: this.userToCreate.paternal_surname,
        maternal_lastname: this.userToCreate.maternal_lastname,
        email: this.userToCreate.email,
        phone_number: this.userToCreate.phone_number,
        type_document: this.userToCreate.type_document.id,
        type_gender: this.userToCreate.type_gender.id,
        type_role: this.userToCreate.type_role.id
      }).subscribe((response: IApiResponse<IUser>) => {
        if (response.code === 201) {
          this.userToCreate.reset();
          this.toast.success().createMessage().show();
          this.router.navigateByUrl('/mobile/tabs/users');
        };

        this.loading = false;
      })
    } catch (error) {
      this.loading = false;
    }
  }
}
