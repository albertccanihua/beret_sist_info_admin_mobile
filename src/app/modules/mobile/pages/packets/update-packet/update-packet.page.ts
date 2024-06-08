import { Component, OnInit } from '@angular/core';
import { Toast } from 'src/app/classes/toast.class';
import { IApiResponse } from 'src/app/interfaces/api-response.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { SpecialityService } from 'src/app/services/speciality/speciality.service';
import { IGetSpecialitiesApiResponse } from 'src/app/interfaces/speciality/get-specialities-api-response.interface';
import { ICheckbox } from 'src/app/interfaces/checkbox.interface';
import { CreatePacketModel } from 'src/app/models/create-packet.model';
import { CreateManyPacketSpecialityModel } from 'src/app/models/create-many-packet-speciality.model';
import { PacketService } from 'src/app/services/packet/packet.service';
import { IPacket } from 'src/app/interfaces/packet/packet.interface';
import { EventBusService } from 'src/app/services/service-bus.service';
import { IShowPacketApiResponse } from 'src/app/interfaces/packet/show-packet-api-response.interface';
import { UpdatePacketModel } from 'src/app/models/update-packet.model';

@Component({
  selector: 'app-update-packet',
  templateUrl: './update-packet.page.html',
  styleUrls: ['./update-packet.page.scss'],
})
export class UpdatePacketPage implements OnInit {

  toast: Toast;

  packetId: string = '';
  packet: IShowPacketApiResponse | undefined;
  specialities: ICheckbox[] = [];
  specialitiesSelected: ICheckbox[] = [];
  packetToUpdate: UpdatePacketModel;
  isModalAddSpecialitiesOpen: boolean = false;

  constructor(
    private _packetService: PacketService,
    private _specialityService: SpecialityService,
    private router: Router,
    private route: ActivatedRoute,
    private _eventBusService: EventBusService
  ) {
    this.packetToUpdate = new UpdatePacketModel();
    this.toast = new Toast();
  }

  ngOnInit() {
    this.showPacket();
  }

  private showPacket() {
    this.route.paramMap.subscribe(params => {
      this.packetId = params.get('id')!;
      this._packetService.show(params.get('id')!).subscribe((data: IApiResponse<IShowPacketApiResponse>) => {
        this.packet = data.result;
        this.packetToUpdate = {
          id: this.packet.id,
          code: this.packet.code,
          name: this.packet.name,
          description: this.packet.description,
          relational_codes: this.packet.relational_codes,
          status: this.packet.status,
          specialities: this.packet.packet_specialities.map((item) => {
            return {
              speciality: item.speciality.id,
              sessions: item.sessions
            }
          })
        };

        this.specialitiesSelected = this.packet.packet_specialities.map((item) => {
          return {
            value: item.speciality.id,
            amount: item.sessions,
            text: item.speciality.name,
            checked: true
          }
        });

      })
    })
  }

  getSpecialities() {
    this._specialityService.get({}).subscribe((data: IApiResponse<IGetSpecialitiesApiResponse[]>) => {
      this.specialities = data.result.map((item: IGetSpecialitiesApiResponse) => {
        let selectedItem = this.specialitiesSelected.find((sItem) => sItem.value === item.id)
        if (selectedItem) {
          return {
            value: item.id,
            amount: selectedItem.amount,
            text: item.name,
            checked: true
          }
        } else {
          return {
            value: item.id,
            amount: 1,
            text: item.name,
            checked: false
          }
        }
      });
    })
  }

  setOpenModalAddSpecialities(value: boolean): void {
    if (value === true) this.getSpecialities();
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
      this.packetToUpdate.name == ''
    ) {
      this.toast.warning().incompleteDataMessage().show();
      return;
    }

    if (this.specialitiesSelected.length === 0) {
      this.toast.warning().setMessage('Debe agregar especialidades al paquete!').show();
      return;
    }

    this.packetToUpdate.specialities = this.specialitiesSelected.map((item) => {
      return {
        speciality: item.value,
        sessions: item.amount
      } as CreateManyPacketSpecialityModel;
    })

    try {
      this._packetService.update({
        id: this.packetId,
        code: this.packetToUpdate.code,
        name: this.packetToUpdate.name,
        description: this.packetToUpdate.description,
        relational_codes: this.packetToUpdate.relational_codes,
        status: this.packetToUpdate.status,
        specialities: this.packetToUpdate.specialities,
      }).subscribe((response: IApiResponse<IPacket>) => {
        if (response.code === 200) {
          this.toast.success().updateMessage().show();
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
