import { TestBed } from '@angular/core/testing';

import { MassiveUploadService } from './massive-upload.service';

describe('MassiveUploadService', () => {
  let service: MassiveUploadService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MassiveUploadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
