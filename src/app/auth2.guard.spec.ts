import { TestBed } from '@angular/core/testing';
import { CanActivateChildFn } from '@angular/router';

import { auth2Guard } from './auth2.guard';

describe('auth2Guard', () => {
  const executeGuard: CanActivateChildFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => auth2Guard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
