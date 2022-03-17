import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataCommuniationServiceService {
  constructor() {}

  private subjectSearchText = new Subject<any>();
  private subjectExportBtnClick = new Subject<any>();
  private subjectDeliveryStatus = new Subject<any>();
  private subjectLocationStatus = new Subject<any>();

  sendSearchText(searchText: string) {
    this.subjectSearchText.next(searchText);
  }

  getSearchText(): Observable<any> {
    return this.subjectSearchText.asObservable();
  }

  sendClickEvent() {
    this.subjectExportBtnClick.next({});
  }

  getClickEvent(): Observable<any> {
    return this.subjectExportBtnClick.asObservable();
  }

  sendDeliveryFilterText(deliveryStatus: string) {
    this.subjectDeliveryStatus.next(deliveryStatus);
  }

  getDeliveryStatus(): Observable<any> {
    return this.subjectDeliveryStatus.asObservable();
  }

  sendLocationFilterText(locationStatus: string) {
    this.subjectLocationStatus.next(locationStatus);
  }

  getLocationStatus(): Observable<any> {
    return this.subjectLocationStatus.asObservable();
  }
}
