import { Component, Input, OnInit } from '@angular/core';
import { DataCommuniationServiceService } from 'src/app/services/data-communiation-service.service';

@Component({
  selector: 'app-custom-select',
  templateUrl: './custom-select.component.html',
  styleUrls: [
    './custom-select.component.css',
    './../order-header.component.css',
  ],
})
export class CustomSelectComponent implements OnInit {
  @Input() selectOf = '';
  check="check"
  availableDeliveryStatuses = [
    'Placed',
    'In Transit',
    'Out for Delivery',
    'Delivered',
  ];
  availableLocations = ['Bangalore', 'Hyderabad', 'Patna'];
  currentOptions: string[] = [];
  deliveryStatus = '';
  locationStatus = '';
  constructor(private dataComService: DataCommuniationServiceService) {}

  ngOnInit(): void {
    if (this.selectOf === 'status') {
      this.currentOptions=this.availableDeliveryStatuses;
    }
    if (this.selectOf === 'distribution') {
      this.currentOptions=this.availableLocations;
    }
  }

  changeOption(event: any, selectOf: any){
    console.log(event,selectOf)
    if(selectOf==='status'){
      this.changeDeliveryStatus(event)
    }
    if(selectOf==='distribution'){
      this.changeLocationStatus(event)
    }
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
