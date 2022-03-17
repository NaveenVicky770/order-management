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
  availableDeliveryStatuses = [
    'Placed',
    'In Transit',
    'Out for Delivery',
    'Delivered',
  ];
  availableLocations = ['Bangalore', 'Hyderabad', 'Patna'];
  currentOptions: string[] = [];
  selectedOption = '';
  status = true;
  constructor(private dataComService: DataCommuniationServiceService) {}

  ngOnInit(): void {
    if (this.selectOf === 'status') {
      this.currentOptions = this.availableDeliveryStatuses;
    }
    if (this.selectOf === 'distribution') {
      this.currentOptions = this.availableLocations;
    }
    this.selectedOption = this.selectOf;
  }

  changeOption(option: any, selectOf: any) {
    this.selectedOption = option;
    this.status = !this.status;
    if (option === selectOf) {
      option = '';
    }
    if (selectOf === 'status') {
      this.changeDeliveryStatus(option);
    }
    if (selectOf === 'distribution') {
      this.changeLocationStatus(option);
    }
  }

  changeDeliveryStatus(optionSelected: any) {
    this.dataComService.sendDeliveryFilterText(optionSelected);
  }

  changeLocationStatus(optionSelected: any) {
    this.dataComService.sendLocationFilterText(optionSelected);
  }
}
