import { TestBed } from '@angular/core/testing';

import { SwapiService } from './swapi.service';
import { HttpClientModule } from '@angular/common/http';

describe('SwapiService', () => {
  let service: SwapiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule]
    });
    service = TestBed.inject(SwapiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
