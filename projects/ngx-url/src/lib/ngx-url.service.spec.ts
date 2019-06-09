import {TestBed} from '@angular/core/testing';
import {NgxUrlService} from 'ngx-url';

describe('NgxUrlService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NgxUrlService = TestBed.get(NgxUrlService);
    expect(service).toBeTruthy();
  });
});
