import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateSpecialityPage } from './create-speciality.page';

describe('CreateSpecialityPage', () => {
  let component: CreateSpecialityPage;
  let fixture: ComponentFixture<CreateSpecialityPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(CreateSpecialityPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
