import { TestBed } from '@angular/core/testing';

import { PomoStateService } from './pomo-state.service';

describe('PomoStateService', () => {
    beforeEach(() => TestBed.configureTestingModule({}));

    it('should be created', () => {
        const service: PomoStateService = TestBed.get(PomoStateService);
        expect(service).toBeTruthy();
    });
});
