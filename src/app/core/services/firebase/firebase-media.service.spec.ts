import { TestBed } from '@angular/core/testing';

import { FirebaseMediaService } from './firebase-media.service';

describe('FirebaseMediaService', () => {
  let service: FirebaseMediaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FirebaseMediaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
