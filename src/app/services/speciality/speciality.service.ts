import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HandleErrorService } from '../handle-error.service';
import { Observable, catchError } from 'rxjs';
import { IApiResponse } from 'src/app/interfaces/api-response.interface';
import { IShowSpecialityApiResponse } from 'src/app/interfaces/speciality/show-speciality-api-response.interface';
import { IGetSpecialitiesApiResponse } from 'src/app/interfaces/speciality/get-specialities-api-response.interface';
import { IPaginateEntityApiResponse } from 'src/app/interfaces/paginate-entity-api-response.interface';
import { IListSpecialitiesApiResponse } from 'src/app/interfaces/speciality/list-specialities-api-response.interface';
import { ISpeciality } from 'src/app/interfaces/speciality/speciality.interface';

@Injectable({
  providedIn: 'root'
})
export class SpecialityService {

  constructor(
    private _http: HttpClient,
    private _handleErrorService: HandleErrorService
  ) { }

  show(id: string): Observable<IApiResponse<IShowSpecialityApiResponse>> {
    return this._http.get<IApiResponse<IShowSpecialityApiResponse>>('specialities/show/' + id).pipe(
      catchError((error: HttpErrorResponse) => { return this._handleErrorService.throw(error) })
    )
  }

  get(args: any): Observable<IApiResponse<IGetSpecialitiesApiResponse[]>> {
    return this._http.get<IApiResponse<IGetSpecialitiesApiResponse[]>>('specialities/get', { params: args }).pipe(
      catchError((error: HttpErrorResponse) => { return this._handleErrorService.throw(error) })
    )
  }

  list(args: any): Observable<IApiResponse<IPaginateEntityApiResponse<IListSpecialitiesApiResponse[]>>> {
    return this._http.get<IApiResponse<IPaginateEntityApiResponse<IListSpecialitiesApiResponse[]>>>('specialities/list', { params: args }).pipe(
      catchError((error: HttpErrorResponse) => { return this._handleErrorService.throw(error) })
    )
  }

  create(data: any): Observable<IApiResponse<ISpeciality>> {
    return this._http.post<IApiResponse<ISpeciality>>('specialities', data).pipe(
      catchError((error: HttpErrorResponse) => { return this._handleErrorService.throw(error) })
    );
  }

  update(data: any): Observable<IApiResponse<ISpeciality>> {
    return this._http.put<IApiResponse<ISpeciality>>('specialities', data).pipe(
      catchError((error: HttpErrorResponse) => { return this._handleErrorService.throw(error) })
    );
  }

  delete(id: string): Observable<IApiResponse<ISpeciality>> {
    return this._http.delete<IApiResponse<ISpeciality>>('specialities', { body: { id } }).pipe(
      catchError((error: HttpErrorResponse) => { return this._handleErrorService.throw(error) }))
  }
}
