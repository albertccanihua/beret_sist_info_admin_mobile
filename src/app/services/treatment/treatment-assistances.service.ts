import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HandleErrorService } from '../handle-error.service';
import { Observable, catchError } from 'rxjs';
import { IApiResponse } from 'src/app/interfaces/api-response.interface';
import { IGetTreatmentAssistanceFollowUpApiResponse } from 'src/app/interfaces/treatment/get-treatment-assistance-follow-up-api-response.interface';

@Injectable({
  providedIn: 'root'
})
export class TreatmentAssistancesService {

  constructor(
    private _http: HttpClient,
    private _handleErrorService: HandleErrorService
  ) { }

  getFollowUp(args: any): Observable<IApiResponse<IGetTreatmentAssistanceFollowUpApiResponse>> {
    return this._http.get<IApiResponse<IGetTreatmentAssistanceFollowUpApiResponse>>('treatment-assistances/get/follow-up', { params: args }).pipe(
      catchError((error: HttpErrorResponse) => { return this._handleErrorService.throw(error) })
    )
  }

}
