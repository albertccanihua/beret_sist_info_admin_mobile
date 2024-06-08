import { TestBed } from '@angular/core/testing';

import { TreatmentAssistancesService } from './treatment-assistances.service';

describe('TreatmentAssistancesService', () => {
  let service: TreatmentAssistancesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TreatmentAssistancesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
