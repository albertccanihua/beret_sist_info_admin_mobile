import { Component, OnInit } from '@angular/core';
import { Toast } from 'src/app/classes/toast.class';
import { IApiResponse } from 'src/app/interfaces/api-response.interface';
import { Router } from '@angular/router';
import { SpecialityService } from 'src/app/services/speciality/speciality.service';
import { IGetSpecialitiesApiResponse } from 'src/app/interfaces/speciality/get-specialities-api-response.interface';
import { ICheckbox } from 'src/app/interfaces/checkbox.interface';
import { CreatePacketModel } from 'src/app/models/create-packet.model';
import { CreateManyPacketSpecialityModel } from 'src/app/models/create-many-packet-speciality.model';
import { PacketService } from 'src/app/services/packet/packet.service';
import { IPacket } from 'src/app/interfaces/packet/packet.interface';
import { EventBusService } from 'src/app/services/service-bus.service';
import { UserService } from 'src/app/services/user/user.service.service';

@Component({
  selector: 'app-create-packet',
  templateUrl: './create-packet.page.html',
  styleUrls: ['./create-packet.page.scss'],
})
export class CreatePacketPage implements OnInit {

  toast: Toast;

  specialities: ICheckbox[] = [];
  specialitiesSelected: ICheckbox[] = [];
  packetToCreate: CreatePacketModel;
  isModalAddSpecialitiesOpen: boolean = false;

  authenticatedUserId: number = 0;


  constructor(
    private _packetService: PacketService,
    private _specialityService: SpecialityService,
    private _userService: UserService,
    private router: Router,
    private _eventBusService: EventBusService
  ) {
    this.packetToCreate = new CreatePacketModel();
    this.toast = new Toast();
  }

  ngOnInit() {
    this.getSpecialities();

    this._userService.currentUserId.subscribe(id => {
      this.authenticatedUserId = id
    })
  }

  getSpecialities() {
    this._specialityService.get({}).subscribe((data: IApiResponse<IGetSpecialitiesApiResponse[]>) => {
      this.specialities = data.result.map((item: IGetSpecialitiesApiResponse) => {
        return {
          value: item.id,
          amount: 1,
          text: item.name,
          checked: false
        }
      });
    })
  }

  setOpenModalAddSpecialities(value: boolean): void {
    this.isModalAddSpecialitiesOpen = value;
  }

  checkSpeciality(event: any) {
    if (event.detail.checked) {
      this.specialitiesSelected.push(event.detail.value)
    } else {
      let index = this.specialitiesSelected.indexOf(event.detail.value);
      if (index !== -1) this.specialitiesSelected.splice(index, 1);
    }
  }

  addSpecialitites() {
    this.specialitiesSelected = this.specialities.filter((item) => item.checked === true);
    this.isModalAddSpecialitiesOpen = false;
  }

  incrementSession(speciality: ICheckbox) {
    let item = this.specialitiesSelected.find(i => i.value === speciality.value);

    if (item) {
      item.amount++;
    }

  }

  decreaseSession(speciality: ICheckbox) {
    let item = this.specialitiesSelected.find(i => i.value === speciality.value);

    if (item && item.amount > 1) {
      item.amount--;
    }
  }

  createUser() {

    if (
      this.packetToCreate.name == ''
    ) {
      this.toast.warning().incompleteDataMessage().show();
      return;
    }

    if (this.specialitiesSelected.length === 0) {
      this.toast.warning().setMessage('Debe agregar especialidades al paquete!').show();
      return;
    }

    this.packetToCreate.specialities = this.specialitiesSelected.map((item) => {
      return {
        speciality: item.value,
        sessions: item.amount
      } as CreateManyPacketSpecialityModel;
    })

    try {
      this._packetService.create({
        user_creator: this.authenticatedUserId,
        name: this.packetToCreate.name,
        code: this.packetToCreate.code,
        description: this.packetToCreate.description,
        relational_codes: this.packetToCreate.relational_codes,
        specialities: this.packetToCreate.specialities,
      }).subscribe((response: IApiResponse<IPacket>) => {
        if (response.code === 201) {
          this.packetToCreate.reset();
          this.toast.success().createMessage().show();
          this.specialitiesSelected = [];
          this._eventBusService.emit('packet-created', 'done');
          this.router.navigateByUrl('/mobile/packets/list');
        };
      })
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
    }
  }

}
