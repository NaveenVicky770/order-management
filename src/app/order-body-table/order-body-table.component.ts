import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataCommuniationServiceService } from '../services/data-communiation-service.service';

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

  messages: any[] = [];
  subscription: Subscription;

  constructor(private dataComService: DataCommuniationServiceService) {
    this.ordersData = data;
    console.log(this.ordersData);

    this.subscription = this.dataComService.getMessage().subscribe(message => {
      if (message) {
        this.messages.push(message);
        console.log(this.messages)
        this.searchText = message.text
      } else {
        // clear messages when empty message received
        this.messages = [];
      }
    });
  }

  ngOnInit(): void {
    console.log(this.ordersData);
  }

  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.subscription.unsubscribe();
}
}
