// Imports
import { of as observableOf } from 'rxjs';

export class MatDialogRefMock {
    open() {
        return 0;
    }
}

export class MatDialogDataMock {
    open() {
        return 0;
    }
}

export class MatDialogMock {
    open() {
        return {
            afterClosed: () => observableOf(null)
        };
    }
}
