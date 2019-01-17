import { TestBed, inject } from '@angular/core/testing';

import { LockScreenServiceP2 } from './lock-screen.service';

describe('LockScreenService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LockScreenServiceP2]
    });
  });

  it('should be created', inject([LockScreenServiceP2], (service: LockScreenServiceP2) => {
    expect(service).toBeTruthy();
  }));
});
