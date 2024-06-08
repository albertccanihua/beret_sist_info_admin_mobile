import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ViewTreatmentPage } from './view-treatment.page';

describe('ViewTreatmentPage', () => {
  let component: ViewTreatmentPage;
  let fixture: ComponentFixture<ViewTreatmentPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ViewTreatmentPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
