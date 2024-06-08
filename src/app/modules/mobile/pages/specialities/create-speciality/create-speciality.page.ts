import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Toast } from 'src/app/classes/toast.class';

import { IApiResponse } from 'src/app/interfaces/api-response.interface';
import { IGetManagementTypesApiResponse } from 'src/app/interfaces/management-type/get-management-types-api-response.interface';
import { ISpeciality } from 'src/app/interfaces/speciality/speciality.interface';
import { CreateSpecialityModel } from 'src/app/models/create-speciality.model';
import { EventBusService } from 'src/app/services/service-bus.service';
import { SpecialityService } from 'src/app/services/speciality/speciality.service';
import { UserService } from 'src/app/services/user/user.service.service';

@Component({
  selector: 'app-create-speciality',
  templateUrl: './create-speciality.page.html',
  styleUrls: ['./create-speciality.page.scss'],
})
export class CreateSpecialityPage implements OnInit {

  toast: Toast;

  specialityToCreate: CreateSpecialityModel;
  isModalAddSpecialitiesOpen: boolean = false;

  typeDocuments: IGetManagementTypesApiResponse[] = [];
  typeGenders: IGetManagementTypesApiResponse[] = [];
  typeRoles: IGetManagementTypesApiResponse[] = [];

  authenticatedUserId: number = 0;

  constructor(
    private _specialitiesService: SpecialityService,
    private _userService: UserService,
    private router: Router,
    private _eventBusService: EventBusService
  ) {
    this.specialityToCreate = new CreateSpecialityModel();
    this.toast = new Toast();
  }

  async ngOnInit() {
    this._userService.currentUserId.subscribe(id => {
      this.authenticatedUserId = id
    })
  }

  createSpeciality() {
    if (
      this.specialityToCreate.code == '' ||
      this.specialityToCreate.name == ''
    ) {
      this.toast.warning().incompleteDataMessage().show();
      return;
    }

    try {
      this._specialitiesService.create({
        code: this.specialityToCreate.code,
        name: this.specialityToCreate.name,
        description: this.specialityToCreate.description,
        user_creator: this.authenticatedUserId,
      }).subscribe((response: IApiResponse<ISpeciality>) => {
        if (response.code === 201) {
          this.specialityToCreate.reset();
          this.toast.success().createMessage().show();
          this._eventBusService.emit('speciality-created', 'done');
          this.router.navigateByUrl('/mobile/specialities/list');
        };
      })
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
    }
  }

}
