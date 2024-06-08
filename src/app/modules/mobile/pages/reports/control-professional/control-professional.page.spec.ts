import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ControlProfessionalPage } from './control-professional.page';

describe('ControlProfessionalPage', () => {
  let component: ControlProfessionalPage;
  let fixture: ComponentFixture<ControlProfessionalPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ControlProfessionalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
