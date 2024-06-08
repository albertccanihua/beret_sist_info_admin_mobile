import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HandleErrorService } from '../handle-error.service';
import { Observable, catchError } from 'rxjs';
import { IApiResponse } from 'src/app/interfaces/api-response.interface';
import { IShowPatientApiResponse } from 'src/app/interfaces/patient/show-patient-api-response.interface';
import { IPaginateEntityApiResponse } from 'src/app/interfaces/paginate-entity-api-response.interface';
import { IListPatientsApiResponse } from 'src/app/interfaces/patient/list-patients-api-response.interface';
import { IPatient } from 'src/app/interfaces/patient/patient.interface';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  constructor(
    private _http: HttpClient,
    private _handleErrorService: HandleErrorService
  ) { }

  show(id: string): Observable<IApiResponse<IShowPatientApiResponse>> {
    return this._http.get<IApiResponse<IShowPatientApiResponse>>('patients/show/' + id).pipe(
      catchError((error: HttpErrorResponse) => { return this._handleErrorService.throw(error) })
    )
  }

  list(args: any): Observable<IApiResponse<IPaginateEntityApiResponse<IListPatientsApiResponse[]>>> {
    return this._http.get<IApiResponse<IPaginateEntityApiResponse<IListPatientsApiResponse[]>>>('patients/list', { params: args }).pipe(
      catchError((error: HttpErrorResponse) => { return this._handleErrorService.throw(error) })
    )
  }

  create(data: any): Observable<IApiResponse<IPatient>> {
    return this._http.post<IApiResponse<IPatient>>('patients', data).pipe(
      catchError((error: HttpErrorResponse) => { return this._handleErrorService.throw(error); })
    );
  }

  update(data: any): Observable<IApiResponse<IPatient>> {
    return this._http.put<IApiResponse<IPatient>>('patients', data).pipe(
      catchError((error: HttpErrorResponse) => { return this._handleErrorService.throw(error); })
    );
  }

  delete(id: string): Observable<IApiResponse<IPatient>> {
    return this._http.delete<IApiResponse<IPatient>>('patients', { body: { id } }).pipe(
      catchError((error: HttpErrorResponse) => { return this._handleErrorService.throw(error); })
    )
  }
}
