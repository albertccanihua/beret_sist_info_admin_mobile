import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AssignPacketPage } from './assign-packet.page';

describe('AssignPacketPage', () => {
  let component: AssignPacketPage;
  let fixture: ComponentFixture<AssignPacketPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AssignPacketPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
