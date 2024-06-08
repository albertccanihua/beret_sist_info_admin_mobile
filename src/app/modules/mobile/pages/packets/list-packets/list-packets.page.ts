import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IPaginateEntityApiResponse } from 'src/app/interfaces/paginate-entity-api-response.interface';
import { Pagination } from 'src/app/classes/pagination.class';
import { ActionSheet } from 'src/app/classes/action-sheet.class';
import { IApiResponse } from 'src/app/interfaces/api-response.interface';
import { Toast } from 'src/app/classes/toast.class';
import { IGetManagementTypesApiResponse } from 'src/app/interfaces/management-type/get-management-types-api-response.interface';
import { AlertController } from '@ionic/angular';
import { SpecialitiesFiltersModel } from 'src/app/models/specialities-filters.model';
import { EventBusService } from 'src/app/services/service-bus.service';
import { IListPacketsApiResponse } from 'src/app/interfaces/packet/list-packets-api-response.interface';
import { PacketService } from 'src/app/services/packet/packet.service';
import { IPacketsApiFilters } from 'src/app/interfaces/packet/packets-api-filters.interface';
import { IPacket } from 'src/app/interfaces/packet/packet.interface';

@Component({
  selector: 'app-list-packets',
  templateUrl: './list-packets.page.html',
  styleUrls: ['./list-packets.page.scss'],
})
export class ListPacketsPage implements OnInit {

  toast: Toast;
  loading: boolean = false;

  packets: IPaginateEntityApiResponse<IListPacketsApiResponse[]> = { data: [], page: 1, total_data: 0, total_page: 0 };
  pagination: Pagination = new Pagination();
  noMoreData = false;
  actionSheet: ActionSheet = new ActionSheet();
  isModalAdvanceFiltersOpen = false;
  packetFilters: IPacketsApiFilters;

  typeDocuments: IGetManagementTypesApiResponse[] = [];
  typeRoles: IGetManagementTypesApiResponse[] = [];

  constructor(
    private _packetService: PacketService,
    private router: Router,
    private alertController: AlertController,
    private _eventBusService: EventBusService
  ) {
    this.packetFilters = new SpecialitiesFiltersModel();
    this.packetFilters = { ...this.pagination.getAsObject() };
    this.toast = new Toast();

    this._eventBusService.on('packet-updated').subscribe((data: string) => this.initialSearch())
    this._eventBusService.on('packet-created').subscribe((data: string) => this.initialSearch())
  }

  async ngOnInit() {
    this.getPacketsList();
  }

  trackById(index: number, item: any): number {
    return item.id;
  }

  private getPacketsList(event = 'reload') {
    this.loading = true;

    this._packetService.list(this.packetFilters).subscribe(response => {
      if (event === 'reload') this.packets = response.result;
      if (event === 'infinite') response.result.data.forEach((item) => this.packets.data.push(item));

      this.noMoreData = response.result.total_page < this.pagination.limit || response.result.total_page === 0;
      this.pagination.page++;
    });

    this.loading = false;
  }

  private deletePacket(id: string) {
    this.loading = true;

    this._packetService.delete(id).subscribe((response: IApiResponse<IPacket>) => {
      if (response.code === 200) {
        this.toast.success().deleteMessage().show();
        this.initialSearch();
      }
    });

    this.loading = false;
  }

  initialSearch() {
    this.isModalAdvanceFiltersOpen = false;
    this.pagination.reset();
    this.packetFilters = { ...this.packetFilters, page: this.pagination.page, limit: this.pagination.limit };
    this.getPacketsList();
  }

  cleanFilters() {
    this.isModalAdvanceFiltersOpen = false;
    this.pagination.reset();
    this.packetFilters = { page: this.pagination.page, limit: this.pagination.limit };
    this.getPacketsList();
  }

  handleSearchbar(event: any) {
    const query = event.target.value.toLowerCase();
    this.packetFilters.name = query;
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
      this.packetFilters = { ...this.packetFilters, page: this.pagination.page, limit: this.pagination.limit };
      this.getPacketsList('infinite');
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
        this.router.navigateByUrl(`/mobile/packets/update/${id}`);
      });
  }

  setOpenModalAdvanceFilters(value: boolean): void {
    this.isModalAdvanceFiltersOpen = value;
  }

  async presentDeleteButton(id: string) {
    const alert = await this.alertController.create({
      header: '¿Está seguro?',
      subHeader: 'El paquete se eliminará permanentemente',
      buttons: [{
        text: 'Cancelar',
        role: 'cancel',
        handler: () => { },
      },
      {
        text: 'Confirmar',
        role: 'confirm',
        handler: () => {
          this.deletePacket(id);
        },
      }],
    });

    await alert.present();
  }

}
