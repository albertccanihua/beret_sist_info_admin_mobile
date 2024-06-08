import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UploadDataPage } from './upload-data.page';

describe('UploadDataPage', () => {
  let component: UploadDataPage;
  let fixture: ComponentFixture<UploadDataPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadDataPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
