import { TestBed } from '@angular/core/testing';

import { CarerService } from './carer.service';

describe('CarerService', () => {
  let service: CarerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CarerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
