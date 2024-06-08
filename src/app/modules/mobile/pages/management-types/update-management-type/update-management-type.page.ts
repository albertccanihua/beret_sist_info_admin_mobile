import { Component, OnInit } from '@angular/core';
import { Toast } from 'src/app/classes/toast.class';
import { IApiResponse } from 'src/app/interfaces/api-response.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { ManagementTypeService } from 'src/app/services/management-type/management-type.service';
import { IManagementType } from 'src/app/interfaces/management-type/management-type.interface';
import { UpdateManagementTypeModel } from 'src/app/models/update-management-type.model';
import { IShowManagementTypeApiResponse } from 'src/app/interfaces/management-type/show-management-type-api-response.interface';
import { EventBusService } from 'src/app/services/service-bus.service';

@Component({
  selector: 'app-update-management-type',
  templateUrl: './update-management-type.page.html',
  styleUrls: ['./update-management-type.page.scss'],
})
export class UpdateManagementTypePage implements OnInit {

  toast: Toast;

  managementTypeId: string = '';
  managementType: IShowManagementTypeApiResponse | undefined;
  managementTypeToUpdate: UpdateManagementTypeModel;

  constructor(
    private _managementTypeService: ManagementTypeService,
    private router: Router,
    private route: ActivatedRoute,
    private _eventBusService: EventBusService
  ) {
    this.managementTypeToUpdate = new UpdateManagementTypeModel();
    this.toast = new Toast();
  }

  ngOnInit(): void {
    this.showManagementType();
  }


  private showManagementType() {
    this.route.paramMap.subscribe(params => {
      this.managementTypeId = params.get('id')!;
      this._managementTypeService.show(params.get('id')!).subscribe((data: IApiResponse<IShowManagementTypeApiResponse>) => {
        this.managementType = data.result;
        this.managementTypeToUpdate = this.managementType as UpdateManagementTypeModel;
      });
    });
  }

  createManagemenType() {

    if (
      this.managementTypeToUpdate.name == '' ||
      this.managementTypeToUpdate.type == '' ||
      this.managementTypeToUpdate.status == undefined
    ) {
      this.toast.warning().incompleteDataMessage().show();
      return;
    }

    this._managementTypeService.update({
      id: this.managementTypeToUpdate.id,
      name: this.managementTypeToUpdate.name,
      description: this.managementTypeToUpdate.description,
      type: this.managementTypeToUpdate.type,
      status: this.managementTypeToUpdate.status
    }).subscribe((response: IApiResponse<IManagementType>) => {
      if (response.code === 200) {
        this.toast.success().createMessage().show();
        this._eventBusService.emit('management-type-updated', 'done');
        this.router.navigateByUrl('/mobile/management-types/list');
      };
    })
  }


}
