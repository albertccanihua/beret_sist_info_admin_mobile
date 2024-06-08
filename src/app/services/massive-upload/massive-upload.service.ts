import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HandleErrorService } from '../handle-error.service';
import { Observable, Subject, catchError } from 'rxjs';
import { IApiResponse } from 'src/app/interfaces/api-response.interface';
import { IGetMassiveUploadsAPIResponse } from 'src/app/interfaces/massive-upload/get-massive-uploads-api-response.interface';
import { IShowMassiveUploadAPIResponse, MassiveUploadItem } from 'src/app/interfaces/massive-upload/show-massive-upload-api-response.interface';

@Injectable({
  providedIn: 'root'
})
export class MassiveUploadService {

  private massiveUploadItem = new Subject<MassiveUploadItem>();

  constructor(
    private _http: HttpClient,
    private _handleErrorService: HandleErrorService
  ) { }

  currentMassiveUploadItem = this.massiveUploadItem.asObservable();

  newMassiveUploadItem(item: MassiveUploadItem) {
    this.massiveUploadItem.next(item);
  }

  send(data: any): Observable<IApiResponse<any>> {
    return this._http.post<IApiResponse<any>>('massive-upload', data).pipe(
      catchError((error: HttpErrorResponse) => { return this._handleErrorService.throw(error) })
    );
  }

  show(id: string): Observable<IApiResponse<IShowMassiveUploadAPIResponse>> {
    return this._http.get<IApiResponse<IShowMassiveUploadAPIResponse>>('massive-upload/show/' + id).pipe(
      catchError((error: HttpErrorResponse) => { return this._handleErrorService.throw(error) })
    );
  }

  get(params: any): Observable<IApiResponse<IGetMassiveUploadsAPIResponse[]>> {
    return this._http.get<IApiResponse<IGetMassiveUploadsAPIResponse[]>>('massive-upload/get', { params: params }).pipe(
      catchError((error: HttpErrorResponse) => { return this._handleErrorService.throw(error) })
    );
  }
}
