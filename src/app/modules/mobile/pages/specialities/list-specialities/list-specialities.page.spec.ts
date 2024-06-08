import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListSpecialitiesPage } from './list-specialities.page';

describe('ListSpecialitiesPage', () => {
  let component: ListSpecialitiesPage;
  let fixture: ComponentFixture<ListSpecialitiesPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ListSpecialitiesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
