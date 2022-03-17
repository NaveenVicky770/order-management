import { Component, OnInit } from '@angular/core';
import { DataCommuniationServiceService } from '../../services/data-communiation-service.service';

@Component({
  selector: 'app-order-header',
  templateUrl: './order-header.component.html',
  styleUrls: ['./order-header.component.css'],
})
export class OrderHeaderComponent implements OnInit {
  availableDeliveryStatuses = [
    'Placed',
    'In Transit',
    'Out for Delivery',
    'Delivered',
  ];
  availableLocations = ['Bangalore', 'Hyderabad', 'Patna'];
  deliveryStatus = '';
  locationStatus = '';
  searchText = '';
  constructor(private dataComService: DataCommuniationServiceService) {}

  ngOnInit(): void {}

  onKeyUp(x: any) {
    this.searchText = x.target.value;
    this.sendSearchText(this.searchText);
  }

  sendSearchText(searchText: string): void {
    this.dataComService.sendSearchText(searchText);
  }

  exportToExcelEvent() {
    this.dataComService.sendClickEvent();
  }

  changeDeliveryStatus(event: any) {
    this.deliveryStatus = event.target.value;
    this.dataComService.sendDeliveryFilterText(this.deliveryStatus);
  }

  changeLocationStatus(event: any) {
    this.locationStatus = event.target.value;
    this.dataComService.sendLocationFilterText(this.locationStatus);
  }
}
