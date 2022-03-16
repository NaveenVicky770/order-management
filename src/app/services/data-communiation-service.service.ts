import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataCommuniationServiceService {
  constructor() {}

  private subject = new Subject<any>();

  sendMessage(message: string) {
    this.subject.next({ text: message });
  }

  clearMessages(some: any) {
    this.subject.next(some);
  }

  getMessage(): Observable<any> {
    return this.subject.asObservable();
  }
}