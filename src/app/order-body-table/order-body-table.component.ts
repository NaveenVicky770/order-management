import { Component, OnInit } from '@angular/core';

import  data from './data'

@Component({
  selector: 'app-order-body-table',
  templateUrl: './order-body-table.component.html',
  styleUrls: ['./order-body-table.component.css']
})
export class OrderBodyTableComponent implements OnInit {
  ordersData=data;

  constructor() { }

  ngOnInit(): void {
    console.log(this.ordersData)
  }

}
