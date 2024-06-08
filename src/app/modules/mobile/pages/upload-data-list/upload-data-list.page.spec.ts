import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UploadDataListPage } from './upload-data-list.page';

describe('UploadDataListPage', () => {
  let component: UploadDataListPage;
  let fixture: ComponentFixture<UploadDataListPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadDataListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
