import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ControlGeneralPage } from './control-general.page';

describe('ControlGeneralPage', () => {
  let component: ControlGeneralPage;
  let fixture: ComponentFixture<ControlGeneralPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ControlGeneralPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
