import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IApiResponse } from 'src/app/interfaces/api-response.interface';
import { DateHelper } from 'src/app/helpers/date.helper';
import { IShowPatientApiResponse } from 'src/app/interfaces/patient/show-patient-api-response.interface';
import { PatientService } from 'src/app/services/patient/patient.service';
import { EventBusService } from 'src/app/services/service-bus.service';
import { PacketService } from 'src/app/services/packet/packet.service';
import { IGetPacketsApiResponse } from 'src/app/interfaces/packet/get-packets-api-response.interface';

@Component({
  selector: 'app-assign-packet',
  templateUrl: './assign-packet.page.html',
  styleUrls: ['./assign-packet.page.scss'],
})
export class AssignPacketPage implements OnInit {

  patientId: string = '';
  patient: IShowPatientApiResponse | undefined;
  patientCreatedAt: string = '';
  packets: IGetPacketsApiResponse[];

  constructor(
    private _patientService: PatientService,
    private _packetService: PacketService,
    private route: ActivatedRoute,
    private _eventBusService: EventBusService,
    private router: Router,
  ) {
    this.packets = [];
  }

  ngOnInit() {
    this.showUser();
    this.getPackets();
  }

  backToList() {
    this._eventBusService.emit('back-to-patients-list', 'general')
    this.router.navigateByUrl('/mobile/tabs/patients');
  }

  private showUser() {
    this.route.paramMap.subscribe(params => {
      this.patientId = params.get('id')!;
      this._patientService.show(params.get('id')!).subscribe((data: IApiResponse<IShowPatientApiResponse>) => {
        this.patient = data.result;
        this.patientCreatedAt = DateHelper.formatDate(this.patient.created_at?.toString() ?? '');
      });
    });
  }

  private getPackets() {
    this._packetService.get({ status: 1 }).subscribe((response: IApiResponse<IGetPacketsApiResponse[]>) => {
      if (response.code === 200) {
        this.packets = response.result;
      }
    });
  }

  assingPacket() {
  }
}
