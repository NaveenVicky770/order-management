import { TestBed } from '@angular/core/testing';

import { DataCommuniationServiceService } from './data-communiation-service.service';

describe('DataCommuniationServiceService', () => {
  let service: DataCommuniationServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataCommuniationServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
