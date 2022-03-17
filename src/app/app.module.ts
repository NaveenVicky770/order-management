import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { OrderHeaderComponent } from './components/order-header/order-header.component';
import { OrderBodyTableComponent } from './components/order-body-table/order-body-table.component';
import { FormsModule } from '@angular/forms';
import { CustomSelectComponent } from './components/order-header/custom-select/custom-select.component';

//Toaster
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    AppComponent,
    OrderHeaderComponent,
    OrderBodyTableComponent,
    CustomSelectComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
