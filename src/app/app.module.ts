import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { OrderHeaderComponent } from './order-header/order-header.component';
import { OrderBodyTableComponent } from './order-body-table/order-body-table.component';
import { TableRowComponent } from './order-body-table/table-row/table-row.component';

@NgModule({
  declarations: [
    AppComponent,
    OrderHeaderComponent,
    OrderBodyTableComponent,
    TableRowComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
