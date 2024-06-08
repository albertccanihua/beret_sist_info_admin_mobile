import { Component, OnInit } from '@angular/core';
import { FilePicker } from '@capawesome/capacitor-file-picker';
import { Toast } from 'src/app/classes/toast.class';
import { IFileUploaded } from 'src/app/interfaces/file-uploaded.interface';
import { IDataToUpload } from 'src/app/interfaces/massive-upload/data-to-upload.interface';
import { MassiveUploadService } from 'src/app/services/massive-upload/massive-upload.service';
import { UserService } from 'src/app/services/user/user.service.service';
import * as xlsx from 'xlsx';

@Component({
  selector: 'app-upload-data',
  templateUrl: './upload-data.page.html',
  styleUrls: ['./upload-data.page.scss'],
})
export class UploadDataPage implements OnInit {

  toast: Toast;
  dataToUpload: IDataToUpload[] = [];
  fileToUpload: IFileUploaded = {};
  existsFile: boolean = false;
  isProcessing: boolean = false;

  authenticatedUserId: number = 0;

  constructor(
    private _massiveUploadService: MassiveUploadService,
    private userService: UserService
  ) {
    this.toast = new Toast();
  }

  ngOnInit() {
    this.userService.currentUserId.subscribe(id => {
      this.authenticatedUserId = id
    })
  }

  async selectFile() {
    this.existsFile = false;

    try {
      const result = await FilePicker.pickFiles({
        types: ['xlsx'],
      });

      if (result.files.length > 0) {
        this.isProcessing = true;

        this.fileToUpload = result.files[0]
        let fr = new FileReader();

        fr.readAsArrayBuffer(result.files[0].blob!)
        fr.onload = () => {


          let data = fr.result;
          let workbook = xlsx.read(data, { type: 'array' })
          const sheetname = workbook.SheetNames[0];
          const sheet1 = workbook.Sheets[sheetname];
          const parsedData = xlsx.utils.sheet_to_json(sheet1, { raw: true })

          this.dataToUpload = parsedData.map((item: any, index: number) => {
            return { id: index + 1, ...item };
          });

          this.existsFile = true
        }

        this.isProcessing = false;
      }
    } catch (error) {
      this.toast.danger().processingError().show();
    }
  }

  async uploadFile() {

    this._massiveUploadService.get({ filename: this.fileToUpload.name }).subscribe(response => {
      if (response.result.length > 0) {
        this.toast.danger().setMessage('Ya se ha realizado una importación con el archivo: ' + this.fileToUpload.name?.toString()).show();
      } else {
        this.isProcessing = true;

        this._massiveUploadService.send({
          filename: this.fileToUpload.name,
          user_creator: this.authenticatedUserId,
          items: this.dataToUpload
        }).subscribe({
          next: (response: any) => {
            if (response.code === 201) {
              this.toast.success().createMessage().show();
            }
          },
          error: (error: any) => {
            this.isProcessing = false
          },
          complete: () => {
            this.isProcessing = false
            this.cancelOperation();
          }
        })
      }
    })

  }

  async cancelOperation() {
    this.existsFile = false;
    this.dataToUpload = [];
  }

}
