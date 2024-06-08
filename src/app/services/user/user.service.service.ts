import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, catchError, retry } from 'rxjs';
import { IApiResponse } from 'src/app/interfaces/api-response.interface';
import { IPaginateEntityApiResponse } from 'src/app/interfaces/paginate-entity-api-response.interface';
import { IListUserApiResponse } from 'src/app/interfaces/user/list-users-api-response.interface';
import { IShowUserApiResponse } from 'src/app/interfaces/user/show-user-api-response.interface';
import { IUser } from 'src/app/interfaces/user/user.interface';
import { HandleErrorService } from '../handle-error.service';
import { IGetUsersApiResponse } from 'src/app/interfaces/user/get-users-api-response.interface';
import { ILoginAPIResponse } from 'src/app/interfaces/user/login-api-response.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userRole = new BehaviorSubject<string>(localStorage.getItem('role') ?? '')
  private userId = new BehaviorSubject<number>(parseInt(localStorage.getItem('user_id') ?? '0'))

  constructor(
    private _http: HttpClient,
    private _handleErrorService: HandleErrorService
  ) { }

  currentUserRole = this.userRole.asObservable();
  currentUserId = this.userId.asObservable();

  newUserRole(role: string) {
    this.userRole.next(role)
  }

  newUserId(id: number) {
    this.userId.next(id);
  }

  show(id: string): Observable<IApiResponse<IShowUserApiResponse>> {
    return this._http.get<IApiResponse<IShowUserApiResponse>>('users/show/' + id).pipe(
      catchError((error: HttpErrorResponse) => { return this._handleErrorService.throw(error); })
    );
  }

  get(args: any): Observable<IApiResponse<IGetUsersApiResponse[]>> {
    return this._http.get<IApiResponse<IGetUsersApiResponse[]>>('users/get', { params: args }).pipe(
      catchError((error: HttpErrorResponse) => { return this._handleErrorService.throw(error); })
    );
  }

  list(args: any): Observable<IApiResponse<IPaginateEntityApiResponse<IListUserApiResponse[]>>> {
    return this._http.get<IApiResponse<IPaginateEntityApiResponse<IListUserApiResponse[]>>>('users/list', { params: args }).pipe(
      catchError((error: HttpErrorResponse) => { return this._handleErrorService.throw(error); })
    );
  }

  create(data: any): Observable<IApiResponse<IUser>> {
    return this._http.post<IApiResponse<IUser>>('users', data).pipe(
      catchError((error: HttpErrorResponse) => { return this._handleErrorService.throw(error); })
    )
  }

  update(data: any): Observable<IApiResponse<IUser>> {
    return this._http.put<IApiResponse<IUser>>('users', data).pipe(
      catchError((error: HttpErrorResponse) => { return this._handleErrorService.throw(error); })
    );
  }

  delete(id: string): Observable<IApiResponse<IUser>> {
    return this._http.delete<IApiResponse<IUser>>('users', { body: { id } }).pipe(
      catchError((error: HttpErrorResponse) => { return this._handleErrorService.throw(error); })
    );
  }

  login(username: string, password: string): Observable<ILoginAPIResponse> {
    return this._http.post<ILoginAPIResponse>('users/login', { username, password }).pipe(
      catchError((error: HttpErrorResponse) => { return this._handleErrorService.throw(error) })
    )
  }
}
