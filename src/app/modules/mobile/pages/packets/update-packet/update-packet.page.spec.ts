import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UpdatePacketPage } from './update-packet.page';

describe('UpdatePacketPage', () => {
  let component: UpdatePacketPage;
  let fixture: ComponentFixture<UpdatePacketPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(UpdatePacketPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
