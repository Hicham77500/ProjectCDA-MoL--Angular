import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowDetailOrdersComponent } from './show-detail-orders.component';

describe('ShowDetailOrdersComponent', () => {
  let component: ShowDetailOrdersComponent;
  let fixture: ComponentFixture<ShowDetailOrdersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowDetailOrdersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowDetailOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
