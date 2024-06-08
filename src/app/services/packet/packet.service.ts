import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { IApiResponse } from 'src/app/interfaces/api-response.interface';
import { HandleErrorService } from '../handle-error.service';
import { IPaginateEntityApiResponse } from 'src/app/interfaces/paginate-entity-api-response.interface';
import { IPacket } from 'src/app/interfaces/packet/packet.interface';
import { IListPacketsApiResponse } from 'src/app/interfaces/packet/list-packets-api-response.interface';
import { IShowPacketApiResponse } from 'src/app/interfaces/packet/show-packet-api-response.interface';
import { IGetPacketsApiResponse } from 'src/app/interfaces/packet/get-packets-api-response.interface';

@Injectable({
  providedIn: 'root'
})
export class PacketService {

  constructor(
    private _http: HttpClient,
    private _handleErrorService: HandleErrorService
  ) { }

  show(id: string): Observable<IApiResponse<IShowPacketApiResponse>> {
    return this._http.get<IApiResponse<IShowPacketApiResponse>>('packets/show/' + id).pipe(
      catchError((error: HttpErrorResponse) => { return this._handleErrorService.throw(error) })
    );
  }

  get(args: any): Observable<IApiResponse<IGetPacketsApiResponse[]>> {
    return this._http.get<IApiResponse<IGetPacketsApiResponse[]>>('packets/get', { params: args }).pipe(
      catchError((error: HttpErrorResponse) => { return this._handleErrorService.throw(error) })
    );
  }

  list(args: any): Observable<IApiResponse<IPaginateEntityApiResponse<IListPacketsApiResponse[]>>> {
    return this._http.get<IApiResponse<IPaginateEntityApiResponse<IListPacketsApiResponse[]>>>('packets/list', { params: args }).pipe(
      catchError((error: HttpErrorResponse) => { return this._handleErrorService.throw(error) })
    );
  }

  create(data: any): Observable<IApiResponse<IPacket>> {
    return this._http.post<IApiResponse<IPacket>>('packets', data).pipe(
      catchError((error: HttpErrorResponse) => { return this._handleErrorService.throw(error) })
    )
  }

  update(data: any): Observable<IApiResponse<IPacket>> {
    return this._http.put<IApiResponse<IPacket>>('packets', data).pipe(
      catchError((error: HttpErrorResponse) => { return this._handleErrorService.throw(error) })
    )
  }

  delete(id: string): Observable<IApiResponse<IPacket>> {
    return this, this._http.delete<IApiResponse<IPacket>>('packets', { body: { id } }).pipe(
      catchError((error: HttpErrorResponse) => { return this._handleErrorService.throw(error) })
    )
  }

}
