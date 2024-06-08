import { Component } from '@angular/core';
import { Toast } from 'src/app/classes/toast.class';
import { IApiResponse } from 'src/app/interfaces/api-response.interface';
import { Router } from '@angular/router';
import { CreateManagementTypeModel } from 'src/app/models/create-management-type.model';
import { ManagementTypeService } from 'src/app/services/management-type/management-type.service';
import { IManagementType } from 'src/app/interfaces/management-type/management-type.interface';
import { EventBusService } from 'src/app/services/service-bus.service';

@Component({
  selector: 'app-create-management-type',
  templateUrl: './create-management-type.page.html',
  styleUrls: ['./create-management-type.page.scss'],
})
export class CreateManagementTypePage {

  toast: Toast;

  managementTypeToCreate: CreateManagementTypeModel;

  constructor(
    private _managementTypeService: ManagementTypeService,
    private router: Router,
    private _eventBusService: EventBusService
  ) {
    this.managementTypeToCreate = new CreateManagementTypeModel();
    this.toast = new Toast();
  }

  createManagemenType() {

    if (
      this.managementTypeToCreate.name == '' ||
      this.managementTypeToCreate.type == ''
    ) {
      this.toast.warning().incompleteDataMessage().show();
      return;
    }

    this._managementTypeService.create({
      name: this.managementTypeToCreate.name,
      description: this.managementTypeToCreate.description,
      type: this.managementTypeToCreate.type,
    }).subscribe((response: IApiResponse<IManagementType>) => {
      if (response.code === 201) {
        this.managementTypeToCreate.reset();
        this.toast.success().createMessage().show();
        this._eventBusService.emit('management-type-created', 'done');
        this.router.navigateByUrl('/mobile/management-types/list');
      };
    })
  }

}
