import { TestBed } from '@angular/core/testing';

import { ContasService } from './cadastro.service';

describe('ContasService', () => {
  let service: ContasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
