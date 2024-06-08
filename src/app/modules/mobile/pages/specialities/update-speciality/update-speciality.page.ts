import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Toast } from 'src/app/classes/toast.class';

import { IApiResponse } from 'src/app/interfaces/api-response.interface';
import { IGetManagementTypesApiResponse } from 'src/app/interfaces/management-type/get-management-types-api-response.interface';
import { IShowSpecialityApiResponse } from 'src/app/interfaces/speciality/show-speciality-api-response.interface';
import { ISpeciality } from 'src/app/interfaces/speciality/speciality.interface';
import { UpdateSpecialityModel } from 'src/app/models/update-speciality.model';
import { EventBusService } from 'src/app/services/service-bus.service';
import { SpecialityService } from 'src/app/services/speciality/speciality.service';


@Component({
  selector: 'app-update-speciality',
  templateUrl: './update-speciality.page.html',
  styleUrls: ['./update-speciality.page.scss'],
})
export class UpdateSpecialityPage implements OnInit {

  toast: Toast;

  specialityId: string = '';
  speciality: IShowSpecialityApiResponse | undefined;
  specialityToUpdate: UpdateSpecialityModel;

  typeDocuments: IGetManagementTypesApiResponse[] = [];
  typeGenders: IGetManagementTypesApiResponse[] = [];
  typeRoles: IGetManagementTypesApiResponse[] = [];

  constructor(
    private _specialitiesService: SpecialityService,
    private router: Router,
    private route: ActivatedRoute,
    private _eventBusService: EventBusService
  ) {
    this.specialityToUpdate = new UpdateSpecialityModel();
    this.toast = new Toast();
  }

  async ngOnInit() {
    this.showSpeciality();
  }

  private showSpeciality() {
    this.route.paramMap.subscribe(params => {
      this.specialityId = params.get('id')!;
      this._specialitiesService.show(params.get('id')!).subscribe((data: IApiResponse<IShowSpecialityApiResponse>) => {
        this.speciality = data.result;
        this.specialityToUpdate = this.speciality as UpdateSpecialityModel;
      });
    });
  }

  updateSpeciality() {
    if (
      this.specialityToUpdate.code == '' ||
      this.specialityToUpdate.name == ''
    ) {
      this.toast.warning().incompleteDataMessage().show();
      return;
    }

    try {
      this._specialitiesService.update({
        id: this.specialityId,
        code: this.specialityToUpdate.code,
        name: this.specialityToUpdate.name,
        description: this.specialityToUpdate.description,
        status: this.specialityToUpdate.status
      }).subscribe((response: IApiResponse<ISpeciality>) => {
        if (response.code === 200) {
          this.toast.success().updateMessage().show();
          this._eventBusService.emit('speciality-updated', 'done');
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
