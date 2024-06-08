import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class HttpConfigInterceptor implements HttpInterceptor {

  private _baseUrl: string = environment.apiUrl;

  constructor() { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    const token = localStorage.getItem('token');

    const modifiedRequest = request.clone({
      url: `${this._baseUrl}${request.url}`,
      setHeaders: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + token
      }
    })

    return next.handle(modifiedRequest);
  }
}
