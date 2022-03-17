import { Component, OnInit } from '@angular/core';
import { DataCommuniationServiceService } from '../../services/data-communiation-service.service';

@Component({
  selector: 'app-order-header',
  templateUrl: './order-header.component.html',
  styleUrls: ['./order-header.component.css'],
})
export class OrderHeaderComponent implements OnInit {

  searchText = '';
  constructor(private dataComService: DataCommuniationServiceService) {}

  ngOnInit(): void {}

  onKeyUp(x: any) {
    this.searchText = x.target.value;
    this.sendSearchText(this.searchText);
  }

  sendSearchText(searchText: string): void {
    this.dataComService.sendSearchText(searchText);
  }

  exportToExcelEvent() {
    this.dataComService.sendClickEvent();
  }

}
