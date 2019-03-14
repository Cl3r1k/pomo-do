import { TestBed } from '@angular/core/testing';

import { PomoTitleService } from './pomo-title.service';

describe('PomoTitleService', () => {
    beforeEach(() => TestBed.configureTestingModule({}));

    it('should be created', () => {
        const service: PomoTitleService = TestBed.get(PomoTitleService);
        expect(service).toBeTruthy();
    });
});
