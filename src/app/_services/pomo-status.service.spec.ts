import { TestBed } from '@angular/core/testing';

import { PomoStatusService } from './pomo-status.service';

describe('PomoStatusService', () => {
    beforeEach(() => TestBed.configureTestingModule({}));

    it('should be created', () => {
        const service: PomoStatusService = TestBed.get(PomoStatusService);
        expect(service).toBeTruthy();
    });
});
