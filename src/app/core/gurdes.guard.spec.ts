import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { gurdesGuard } from './gurdes.guard';

describe('gurdesGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => gurdesGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
