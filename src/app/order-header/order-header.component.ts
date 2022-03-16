import { Component, OnInit } from '@angular/core';
import { DataCommuniationServiceService } from '../services/data-communiation-service.service';

@Component({
  selector: 'app-order-header',
  templateUrl: './order-header.component.html',
  styleUrls: ['./order-header.component.css'],
})
export class OrderHeaderComponent implements OnInit {
  deliveryStatus="";
  locationStatus="";
  searchText="";
  constructor(private dataComService: DataCommuniationServiceService) {}

  ngOnInit(): void {}

  onKeyUp(x: any) {
    // appending the updated value to the variable
    this.searchText = x.target.value;
    this.sendMessage(this.searchText);
  }

  sendMessage(message: string): void {
    // send message to subscribers via observable subject
    this.dataComService.sendMessage(message);
  }

  clearMessages(): void {
    // clear messages
    this.dataComService.clearMessages('');
  }

  exportToExcelEvent() {
    this.dataComService.sendClickEvent();
  }

  changeDeliveryStatus(event:any){
    this.deliveryStatus=(event.target.value);
    this.dataComService.sendDeliveryFilter(this.deliveryStatus);
  }

  changeLocationStatus(event:any){
    this.locationStatus=(event.target.value);
    this.dataComService.sendLocationFilter(this.locationStatus);
  }
}
