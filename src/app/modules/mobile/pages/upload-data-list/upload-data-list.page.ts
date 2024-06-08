import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActionSheet } from 'src/app/classes/action-sheet.class';
import { DateHelper } from 'src/app/helpers/date.helper';
import { IGetMassiveUploadsAPIResponse } from 'src/app/interfaces/massive-upload/get-massive-uploads-api-response.interface';
import { MassiveUploadService } from 'src/app/services/massive-upload/massive-upload.service';

@Component({
  selector: 'app-upload-data-list',
  templateUrl: './upload-data-list.page.html',
  styleUrls: ['./upload-data-list.page.scss'],
})
export class UploadDataListPage implements OnInit {

  loading: boolean = false;

  actionSheet: ActionSheet = new ActionSheet();
  massiveUploads: IGetMassiveUploadsAPIResponse[] = [];

  constructor(
    private _massiveUploadService: MassiveUploadService,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.getMassiveUploads();
  }

  getMassiveUploads() {
    this._massiveUploadService.get({}).subscribe(response => {
      if (response.code == 200) {
        this.massiveUploads = response.result.map(item => {
          return {
            ...item,
            created_at: DateHelper.formatDate(item.created_at),
          }
        })
      }
    })
  }

  setOpen(isOpen: boolean, id?: any) {
    this.actionSheet.clearButtons();
    this.actionSheet.isActionSheetOpen = isOpen;

    this.actionSheet
      .setCancelAction()
      .setViewAction('Ver', () => {
        this.router.navigateByUrl(`/mobile/upload-data-view/${id}`);
      })
  }

}
