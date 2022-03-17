import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderBodyTableComponent } from './order-body-table.component';

describe('OrderBodyTableComponent', () => {
  let component: OrderBodyTableComponent;
  let fixture: ComponentFixture<OrderBodyTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderBodyTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderBodyTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
