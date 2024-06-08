import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { HandleErrorService } from "../handle-error.service";
import { Observable, catchError } from "rxjs";
import { IApiResponse } from "src/app/interfaces/api-response.interface";
import { ITreatmentRequest } from "src/app/interfaces/treatment/treatment-request.interface";
import { IGetTreatmentRequestFollowUpApiResponse } from "src/app/interfaces/treatment/get-treatment-request-follow-up-api-response.interface";

@Injectable({
    providedIn: 'root'
})
export class TreatmentRequestService {

    constructor(
        private _http: HttpClient,
        private _handleErrorService: HandleErrorService
    ) { }

    getFollowUp(args: any): Observable<IApiResponse<IGetTreatmentRequestFollowUpApiResponse>> {
        return this._http.get<IApiResponse<IGetTreatmentRequestFollowUpApiResponse>>('treatment-requests/get/follow-up', { params: args }).pipe(
            catchError((error: HttpErrorResponse) => { return this._handleErrorService.throw(error) })
        )
    }

    create(data: any): Observable<IApiResponse<ITreatmentRequest>> {
        return this._http.post<IApiResponse<ITreatmentRequest>>('treatment-requests', data).pipe(
            catchError((error: HttpErrorResponse) => { return this._handleErrorService.throw(error) })
        );
    }
}