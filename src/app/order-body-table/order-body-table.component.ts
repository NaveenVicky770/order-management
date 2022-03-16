import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataCommuniationServiceService } from '../services/data-communiation-service.service';
import { ExcelServiceService } from '../services/excelService/excel-service.service';

import data from './data';

type order = {
  refId: string;
  customer: string;
  product: string;
  date: string;
  distribution: string;
  status: string;
  price: string;
  isSelected: boolean;
};

@Component({
  selector: 'app-order-body-table',
  templateUrl: './order-body-table.component.html',
  styleUrls: ['./order-body-table.component.css'],
})
export class OrderBodyTableComponent implements OnInit {
  searchText: string | undefined;

  ordersData: order[] = [];

  messages: any[] = [];
  subscription: Subscription;
  clickEventsubscription: Subscription;

  masterSelected: boolean;
  checklist: any;
  checkedList: any;
  noOfChecked = 0;

  constructor(
    private dataComService: DataCommuniationServiceService,
    private excelService: ExcelServiceService
  ) {
    this.ordersData = data;

    this.subscription = this.dataComService
      .getMessage()
      .subscribe((message) => {
        if (message) {
          this.searchText = message.text;
        } else {
          // clear messages when empty message received
          this.messages = [];
        }
        console.log("Delivery Status",message.status)
        console.log("Search Text",message.text)
      });

    this.masterSelected = false;
    this.checklist = data;
    this.getCheckedItemList();

    this.clickEventsubscription = this.dataComService
      .getClickEvent()
      .subscribe(() => {
        this.exportToExcel();
      });
  }

  ngOnInit(): void {}

  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.subscription.unsubscribe();
    this.clickEventsubscription.unsubscribe();
  }

  // The master checkbox will check/ uncheck all items
  checkUncheckAll() {
    for (var i = 0; i < this.ordersData.length; i++) {
      this.ordersData[i].isSelected = this.masterSelected;
    }
    this.masterSelected === true
      ? (this.noOfChecked = this.ordersData.length)
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
}
