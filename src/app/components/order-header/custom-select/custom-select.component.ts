import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
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
  status = false;
  dropDownSubscription: Subscription;
  constructor(private dataComService: DataCommuniationServiceService) {
    this.dropDownSubscription = this.dataComService
      .getDropDownStatus()
      .subscribe((menuStatus) => {
        console.log(menuStatus);
        if (menuStatus.selectedMenu === this.selectOf) {
          return;
        } else {
          this.status = false;
        }
      });
  }

  ngOnInit(): void {
    if (this.selectOf === 'status') {
      this.currentOptions = this.availableDeliveryStatuses;
    }
    if (this.selectOf === 'distribution') {
      this.currentOptions = this.availableLocations;
    }
    this.selectedOption = this.selectOf;
  }

  changeDropDownStatus() {
    this.status = !this.status;
    this.dataComService.sendDropDownStatus({
      selectedMenu: this.selectOf,
      status: !this.status,
    });
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
