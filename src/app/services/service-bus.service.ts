import { Injectable } from "@angular/core";
import { Observable, Subject, filter, map } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class EventBusService {
    private subject = new Subject<any>();

    emit(event: string, data?: any) {
        this.subject.next({ event, data });
    }

    on(event: string): Observable<any> {
        return this.subject.asObservable().pipe(
            filter((e: any) => e.event === event),
            map((e: any) => e.data)
        );
    }
}