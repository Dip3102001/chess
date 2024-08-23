import { TestBed } from '@angular/core/testing';

import { CharToPiecesService } from './char-to-pieces.service';

describe('CharToPiecesService', () => {
  let service: CharToPiecesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CharToPiecesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
