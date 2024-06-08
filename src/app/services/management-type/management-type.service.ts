import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { IApiResponse } from 'src/app/interfaces/api-response.interface';
import { IGetManagementTypesApiResponse } from 'src/app/interfaces/management-type/get-management-types-api-response.interface';
import { IListManagementTypesApiResponse } from 'src/app/interfaces/management-type/list-management-types-api-response.interface';
import { HandleErrorService } from '../handle-error.service';
import { IManagementType } from 'src/app/interfaces/management-type/management-type.interface';
import { IPaginateEntityApiResponse } from 'src/app/interfaces/paginate-entity-api-response.interface';
import { IShowManagementTypeApiResponse } from 'src/app/interfaces/management-type/show-management-type-api-response.interface';

@Injectable({
  providedIn: 'root'
})
export class ManagementTypeService {

  constructor(
    private _http: HttpClient,
    private _handleErrorService: HandleErrorService
  ) { }

  show(id: string): Observable<IApiResponse<IShowManagementTypeApiResponse>> {
    return this._http.get<IApiResponse<IShowManagementTypeApiResponse>>('management-types/show/' + id).pipe(
      catchError((error: HttpErrorResponse) => { return this._handleErrorService.throw(error) })
    )
  }

  get(args: any): Observable<IApiResponse<IGetManagementTypesApiResponse[]>> {
    return this._http.get<IApiResponse<IGetManagementTypesApiResponse[]>>('management-types/get', { params: args }).pipe(
      catchError((error: HttpErrorResponse) => { return this._handleErrorService.throw(error) })
    )
  }

  list(args: any): Observable<IApiResponse<IPaginateEntityApiResponse<IListManagementTypesApiResponse[]>>> {
    return this._http.get<IApiResponse<IPaginateEntityApiResponse<IListManagementTypesApiResponse[]>>>('management-types/list', { params: args }).pipe(
      catchError((error: HttpErrorResponse) => { return this._handleErrorService.throw(error) })
    )
  }

  create(data: any): Observable<IApiResponse<IManagementType>> {
    return this._http.post<IApiResponse<IManagementType>>('management-types', data).pipe(
      catchError((error: HttpErrorResponse) => { return this._handleErrorService.throw(error) })
    );
  }

  update(data: any): Observable<IApiResponse<IManagementType>> {
    return this._http.put<IApiResponse<IManagementType>>('management-types', data).pipe(
      catchError((error: HttpErrorResponse) => { return this._handleErrorService.throw(error) })
    )
  }
}
