import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UpdateSpecialityPage } from './update-speciality.page';

describe('UpdateSpecialityPage', () => {
  let component: UpdateSpecialityPage;
  let fixture: ComponentFixture<UpdateSpecialityPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(UpdateSpecialityPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
