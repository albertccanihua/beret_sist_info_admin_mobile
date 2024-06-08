import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DateHelper } from 'src/app/helpers/date.helper';
import { IShowMassiveUploadAPIResponse, MassiveUploadItem } from 'src/app/interfaces/massive-upload/show-massive-upload-api-response.interface';
import { MassiveUploadService } from 'src/app/services/massive-upload/massive-upload.service';

@Component({
  selector: 'app-upload-data-view',
  templateUrl: './upload-data-view.page.html',
  styleUrls: ['./upload-data-view.page.scss'],
})
export class UploadDataViewPage implements OnInit {

  isModalOpen = false;
  massiveUploadId: string = '';
  massiveUpload: IShowMassiveUploadAPIResponse | undefined;
  massiveUploadCreatedAt: string = '';

  massiveUploadItem: MassiveUploadItem | undefined;
  objectKeys: string[] = [];
  objectValues: any[] = [];
  status: any[] = [];

  constructor(
    private _massiveUploadService: MassiveUploadService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.showMassiveUpload()

    this._massiveUploadService.currentMassiveUploadItem.subscribe(item => {
      this.massiveUploadItem = item;
      this.massiveUploadItem.item = JSON.parse(item.item);
      this.objectKeys = Object.keys(this.massiveUploadItem.item);
      this.objectValues = Object.values(this.massiveUploadItem.item);
      this.status = JSON.parse(this.massiveUploadItem.reason)
    });

  }

  private showMassiveUpload() {
    this.route.paramMap.subscribe(params => {
      this.massiveUploadId = params.get('id')!;
      this._massiveUploadService.show(params.get('id')!).subscribe(response => {
        this.massiveUpload = response.result;
        this.massiveUploadCreatedAt = DateHelper.formatDate(this.massiveUpload.created_at?.toString() ?? '')
      })
    });
  }

  setOpen(item: MassiveUploadItem) {
    this.isModalOpen = true;
    this._massiveUploadService.newMassiveUploadItem(item)
  }

  setClose() {
    this.isModalOpen = false;
  }

}
