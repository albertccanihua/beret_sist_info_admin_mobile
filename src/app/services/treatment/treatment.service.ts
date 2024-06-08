import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { HandleErrorService } from "../handle-error.service";
import { Observable, catchError } from "rxjs";
import { IApiResponse } from "src/app/interfaces/api-response.interface";
import { IGetTreatmentsApiResponse } from "src/app/interfaces/treatment/get-treatments-api-response.interface";
import { ITreatment } from "src/app/interfaces/treatment/treatment.interface";
import { IShowTreatmentAPIResponse } from "src/app/interfaces/treatment/show-treatment-api-response.interface";

@Injectable({
    providedIn: 'root'
})
export class TreatmentService {

    constructor(
        private _http: HttpClient,
        private _handleErrorService: HandleErrorService
    ) { }

    show(id: string): Observable<IApiResponse<IShowTreatmentAPIResponse>> {
        return this._http.get<IApiResponse<IShowTreatmentAPIResponse>>('treatments/show/' + id).pipe(
            catchError((error: HttpErrorResponse) => { return this._handleErrorService.throw(error) })
        );
    }

    get(args: any): Observable<IApiResponse<IGetTreatmentsApiResponse[]>> {
        return this._http.get<IApiResponse<IGetTreatmentsApiResponse[]>>('treatments/get', { params: args }).pipe(
            catchError((error: HttpErrorResponse) => { return this._handleErrorService.throw(error) })
        );
    }

    create(data: any): Observable<IApiResponse<ITreatment>> {
        return this._http.post<IApiResponse<ITreatment>>('treatments', data).pipe(
            catchError((error: HttpErrorResponse) => { return this._handleErrorService.throw(error) })
        );
    }
}