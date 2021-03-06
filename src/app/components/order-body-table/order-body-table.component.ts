import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataCommuniationServiceService } from '../../services/data-communiation-service.service';
import { ExcelServiceService } from '../../services/excelService/excel-service.service';
import ordersData from '../../Data/jsonData';
import { order } from '../../models/order';

import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-order-body-table',
  templateUrl: './order-body-table.component.html',
  styleUrls: ['./order-body-table.component.css'],
})
export class OrderBodyTableComponent implements OnInit {
  searchText = '';
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
    private excelService: ExcelServiceService,
    private toastr: ToastrService
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
        this.resetStatus();
        this.filterOrders();
      });

    this.deliveryFilterSubscription = this.dataComService
      .getDeliveryStatus()
      .subscribe((deliveryStatus) => {
        this.deliveryFilter = deliveryStatus;
        this.resetStatus();
        this.filterOrders();
      });

    this.locationFilterSubscription = this.dataComService
      .getLocationStatus()
      .subscribe((locationStatus) => {
        this.locationFilter = locationStatus;
        this.resetStatus();
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

  // Get List of Checked Items
  getCheckedItemList() {
    this.checkedList = [];
    for (var i = 0; i < this.filteredOrders.length; i++) {
      if (this.filteredOrders[i].isSelected)
        this.checkedList.push(this.filteredOrders[i]);
    }
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

  resetStatus() {
    this.filteredOrders = ordersData;
    this.masterSelected = false;
    this.checkUncheckAll();
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

  //Check Only one or More
  checkUncheckOneOrMore(refId: any, checked: boolean) {
    console.log(refId);
    checked ? (this.noOfChecked += 1) : (this.noOfChecked -= 1);
    if (this.noOfChecked === this.filteredOrders.length) {
      this.masterSelected = true;
    }
  }

  // function to export selcted rows as excel
  exportToExcel() {
    console.log(this.checkedList);
    if (this.checkedList.length === 0) {
      this.toastr.error('Please select atleast one row to Export', 'Error', {
        timeOut: 1500,
        positionClass: 'toast-bottom-right'
      });
      return;
    }
    this.excelService.exportAsExcelFile(this.checkedList, 'Selected_Rows');
    this.toastr.success('Successfully Exported', 'Success', {
      timeOut: 1500,
      progressBar: true,
      positionClass: 'toast-bottom-left'
    });
  }

  //function to filter ordersData based on the search and filters criteria
  filterOrders = () => {
    this.filteredOrders = this.ordersData.filter((item) => {
      return (
        (item.status == this.deliveryFilter || this.deliveryFilter == '') &&
        (item.distribution == this.locationFilter ||
          this.locationFilter == '') &&
        JSON.stringify(item).toLowerCase().includes(this.searchText)
      );
    });
    console.log(this.filteredOrders);
  };
}
