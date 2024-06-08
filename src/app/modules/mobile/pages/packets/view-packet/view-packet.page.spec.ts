import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ViewPacketPage } from './view-packet.page';

describe('ViewPacketPage', () => {
  let component: ViewPacketPage;
  let fixture: ComponentFixture<ViewPacketPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ViewPacketPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
