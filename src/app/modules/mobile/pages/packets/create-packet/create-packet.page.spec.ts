import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreatePacketPage } from './create-packet.page';

describe('CreatePacketPage', () => {
  let component: CreatePacketPage;
  let fixture: ComponentFixture<CreatePacketPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(CreatePacketPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
