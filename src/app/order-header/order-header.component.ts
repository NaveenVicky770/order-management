import { Component, OnInit } from '@angular/core';
import { DataCommuniationServiceService } from '../services/data-communiation-service.service';

@Component({
  selector: 'app-order-header',
  templateUrl: './order-header.component.html',
  styleUrls: ['./order-header.component.css'],
})
export class OrderHeaderComponent implements OnInit {
  constructor(private dataComService: DataCommuniationServiceService) {}

  ngOnInit(): void {}

  onKeyUp(x: any) {
    // appending the updated value to the variable
    console.log(x.target.value);
    let message = x.target.value;
    this.sendMessage(message);
  }

  sendMessage(message: string): void {
    // send message to subscribers via observable subject
    this.dataComService.sendMessage(message);
  }

  clearMessages(): void {
    // clear messages
    this.dataComService.clearMessages('');
  }

  exportToExcelEvent() {
    this.dataComService.sendClickEvent();
  }
}
