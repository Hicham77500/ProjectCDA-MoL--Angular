import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilVisitComponent } from './profil-visit.component';

describe('ProfilVisitComponent', () => {
  let component: ProfilVisitComponent;
  let fixture: ComponentFixture<ProfilVisitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfilVisitComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfilVisitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
