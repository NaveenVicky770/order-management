import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataCommuniationServiceService } from '../../services/data-communiation-service.service';
import { ExcelServiceService } from '../../services/excelService/excel-service.service';
import ordersData from './data';
import { order } from '../../models/order';

@Component({
  selector: 'app-order-body-table',
  templateUrl: './order-body-table.component.html',
  styleUrls: ['./order-body-table.component.css'],
})
export class OrderBodyTableComponent implements OnInit {
  searchText='';
  deliveryFilter = '';
  locationFilter = '';

  ordersData: order[] = [];
  filteredOrders: order[] = [];

  searchSubscription: Subscription;
  clickEventsubscription: Subscription;
  deliveryFilterSubscription: Subscription;
  locationFilterSubscription: Subscription;

  masterSelected: boolean;
  checklist: any;
  checkedList: any;
  noOfChecked = 0;

  constructor(
    private dataComService: DataCommuniationServiceService,
    private excelService: ExcelServiceService
  ) {
    this.ordersData = ordersData;
    this.filteredOrders = ordersData;
    this.masterSelected = false;
    this.checklist = ordersData;
    this.getCheckedItemList();

    //Subscriptions to Observables in order OrderHeaderComponent

    this.searchSubscription = this.dataComService
      .getSearchText()
      .subscribe((searchText) => {
        this.searchText = searchText;
      });

    this.deliveryFilterSubscription = this.dataComService
      .getDeliveryStatus()
      .subscribe((deliveryStatus) => {
        this.deliveryFilter = deliveryStatus;
        this.filterOrders();
      });

    this.locationFilterSubscription = this.dataComService
      .getLocationStatus()
      .subscribe((locationStatus) => {
        this.locationFilter = locationStatus;
        this.filterOrders();
      });

    this.clickEventsubscription = this.dataComService
      .getClickEvent()
      .subscribe(() => {
        this.exportToExcel();
      });
  }

  ngOnInit(): void {}

  ngOnDestroy() {
    // unsubscribing to ensure no memory leaks
    this.searchSubscription.unsubscribe();
    this.deliveryFilterSubscription.unsubscribe();
    this.locationFilterSubscription.unsubscribe();
    this.clickEventsubscription.unsubscribe();
  }

  // The master checkbox will check/ uncheck all items
  checkUncheckAll() {
    for (var i = 0; i < this.filteredOrders.length; i++) {
      this.filteredOrders[i].isSelected = this.masterSelected;
    }
    this.masterSelected === true
      ? (this.noOfChecked = this.filteredOrders.length)
      : (this.noOfChecked = 0);
    this.getCheckedItemList();
  }

  //Check Only one or More
  checkUncheckOneOrMore(refId: any, checked: boolean) {
    console.log(refId);
    checked ? (this.noOfChecked += 1) : (this.noOfChecked -= 1);
  }

  // Check All Checkbox Checked
  isAllSelected(refId: any, event: any) {
    console.log(event.target.checked);
    let checked = event.target.checked;
    this.masterSelected = this.checklist.every(function (item: any) {
      return item.isSelected == true;
    });
    if (
      this.masterSelected == false &&
      this.ordersData.length == this.noOfChecked
    ) {
      this.noOfChecked -= 1;
    } else {
      this.checkUncheckOneOrMore(refId, checked);
    }
    this.getCheckedItemList();
  }

  // Get List of Checked Items
  getCheckedItemList() {
    this.checkedList = [];
    for (var i = 0; i < this.checklist.length; i++) {
      if (this.checklist[i].isSelected)
        this.checkedList.push(this.checklist[i]);
    }
    // this.checkedList = JSON.stringify(this.checkedList);
  }

  exportToExcel() {
    if (this.checkedList.length === 0) {
      alert('Please select some rows to Export');
      return;
    }
    this.excelService.exportAsExcelFile(this.checkedList, 'Selected_Rows');
  }

  filterOrders = () => {
    this.filteredOrders = this.ordersData.filter((item) => {
      console.log(item.status == this.deliveryFilter);
      return (
        (item.status == this.deliveryFilter || this.deliveryFilter == '') &&
        (item.distribution == this.locationFilter || this.locationFilter == '')
      );
    });
    console.log(this.filteredOrders);
  };
}
