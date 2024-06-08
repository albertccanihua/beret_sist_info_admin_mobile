import { TestBed } from '@angular/core/testing';

import { ManagementTypeService } from './management-type.service';

describe('ManagementTypeService', () => {
  let service: ManagementTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ManagementTypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
