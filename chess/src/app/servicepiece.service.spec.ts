import { TestBed } from '@angular/core/testing';

import { ServicepieceService } from './servicepiece.service';

describe('ServicepieceService', () => {
  let service: ServicepieceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServicepieceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
