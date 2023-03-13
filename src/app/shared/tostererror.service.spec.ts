import { TestBed } from '@angular/core/testing';

import { TostererrorService } from './tostererror.service';

describe('TostererrorService', () => {
  let service: TostererrorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TostererrorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
