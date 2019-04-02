import { TestBed } from '@angular/core/testing';

// Services
import { PomoTitleService } from './pomo-title.service';
import { TodoOrderService } from '@app/_services/todo-order.service';
import { TodoOrderMockService } from '@app/_services/todo-order-mock.service';

describe('Service: PomoTitleService', () => {

    let service: PomoTitleService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                {
                    provide: TodoOrderService,
                    useClass: TodoOrderMockService
                }
            ]
        });

        service = TestBed.get(PomoTitleService);
    });

    it('should be created', () => {
        // Arrange

        // Act

        // Assert
        expect(service).toBeTruthy();
    });
});
