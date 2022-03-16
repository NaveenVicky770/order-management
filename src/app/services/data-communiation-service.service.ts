import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataCommuniationServiceService {
  constructor() {}

  private subject = new Subject<any>();
  private subject2 = new Subject<any>();

  sendMessage(message: string, deliveryStatus: string) {
    this.subject.next({ text: message, status: deliveryStatus });
  }

  clearMessages(some: any) {
    this.subject.next(some);
  }

  getMessage(): Observable<any> {
    return this.subject.asObservable();
  }

  sendClickEvent() {
    this.subject2.next({});
  }

  getClickEvent(): Observable<any> {
    return this.subject2.asObservable();
  }
}
