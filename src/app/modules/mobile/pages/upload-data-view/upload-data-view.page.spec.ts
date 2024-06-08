import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UploadDataViewPage } from './upload-data-view.page';

describe('UploadDataViewPage', () => {
  let component: UploadDataViewPage;
  let fixture: ComponentFixture<UploadDataViewPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadDataViewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
