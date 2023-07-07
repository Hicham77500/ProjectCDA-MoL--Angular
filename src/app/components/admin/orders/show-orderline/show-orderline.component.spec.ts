import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowOrderlineComponent } from './show-orderline.component';

describe('ShowOrderlineComponent', () => {
  let component: ShowOrderlineComponent;
  let fixture: ComponentFixture<ShowOrderlineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowOrderlineComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowOrderlineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
