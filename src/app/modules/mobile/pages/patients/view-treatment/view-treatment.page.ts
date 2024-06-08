import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PopoverController } from '@ionic/angular';
import { DateHelper } from 'src/app/helpers/date.helper';
import { IShowTreatmentAPIResponse, ITreatmentAssistance } from 'src/app/interfaces/treatment/show-treatment-api-response.interface';
import { TreatmentService } from 'src/app/services/treatment/treatment.service';

@Component({
  selector: 'app-view-treatment',
  templateUrl: './view-treatment.page.html',
  styleUrls: ['./view-treatment.page.scss'],
})
export class ViewTreatmentPage implements OnInit {

  @ViewChild('popover') popover: any;

  isOpenPopover: boolean = false;

  treatmentId: string = '';
  treatment: IShowTreatmentAPIResponse | undefined;
  treatmentCreatedAt: string = '';

  constructor(
    private _treatmentService: TreatmentService,
    private popoverController: PopoverController,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.showTreatment();
  }

  async presentPopover(e: Event) {
    this.popover.event = e;
    this.isOpenPopover = true;
  }

  private showTreatment() {
    this.route.paramMap.subscribe(params => {
      this.treatmentId = params.get('id')!;
      this._treatmentService.show(params.get('id')!).subscribe(response => {
        this.treatment = response.result;
        this.treatmentCreatedAt = DateHelper.formatDate(this.treatment.created_at?.toString() ?? '');

        if (this.treatment?.treatment_specialities) {
          for (let x = 0; x < this.treatment.treatment_specialities.length; x++) {
            let speciality = this.treatment.treatment_specialities[x];
            const assistances = speciality.treatment_assistances;
            this.treatment.treatment_specialities[x].treatment_assistances = [];

            for (let i = 0; i < speciality.sessions; i++) {
              if (assistances[i] !== undefined) {
                this.treatment.treatment_specialities[x].treatment_assistances.push(assistances[i]);
              } else {
                this.treatment.treatment_specialities[x].treatment_assistances.push({ id: 0 } as ITreatmentAssistance);
              }
              console.log(assistances[i]);
            }
          }
        }
      });
    });
  }
}
