import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymensComponent } from './paymens.component';

describe('PaymensComponent', () => {
  let component: PaymensComponent;
  let fixture: ComponentFixture<PaymensComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaymensComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymensComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
