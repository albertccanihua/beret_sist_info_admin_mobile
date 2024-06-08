import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ViewManagementTypePage } from './view-management-type.page';

describe('ViewManagementTypePage', () => {
  let component: ViewManagementTypePage;
  let fixture: ComponentFixture<ViewManagementTypePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ViewManagementTypePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
