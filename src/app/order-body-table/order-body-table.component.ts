import { Component, OnInit } from '@angular/core';

import data from './data';

type order = {
  refId: string;
  customer: string;
  product: string;
  date: string;
  distribution: string;
  status: string;
  price: string;
};

@Component({
  selector: 'app-order-body-table',
  templateUrl: './order-body-table.component.html',
  styleUrls: ['./order-body-table.component.css'],
})
export class OrderBodyTableComponent implements OnInit {
  searchText: string | undefined;

  ordersData: order[] = [];

  constructor() {
    this.ordersData = data;
    console.log(this.ordersData);
  }

  ngOnInit(): void {
    console.log(this.ordersData);
  }
}
