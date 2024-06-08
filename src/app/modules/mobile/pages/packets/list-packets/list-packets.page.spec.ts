import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListPacketsPage } from './list-packets.page';

describe('ListPacketsPage', () => {
  let component: ListPacketsPage;
  let fixture: ComponentFixture<ListPacketsPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ListPacketsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
