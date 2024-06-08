import { TestBed } from '@angular/core/testing';

import { PacketSpecialityService } from './packet-speciality.service';

describe('PacketSpecialityService', () => {
  let service: PacketSpecialityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PacketSpecialityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
