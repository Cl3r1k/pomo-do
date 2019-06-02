import { TestBed, async } from '@angular/core/testing';

import { Utils } from '@app/_common/utils';

describe(`Class: Utils`, () => {

    let _utils: Utils;

    beforeEach(() => {
        _utils = new Utils();
    });

    it(`Should create an instance (async)`, async(() => {
        // Arrange

        // Act

        // Assert
        expect(_utils).toBeTruthy();
    }));

    describe(`#randomRangeInteger():`, () => {
        it(`Should return value from val1 to val2 (async)`, async(() => {
            // Arrange
            let result: number;
            const val1 = 0;
            const val2 = 10;

            // Act
            result = _utils.randomRangeInteger(val1, val2);

            // Assert
            expect(result).toBeGreaterThanOrEqual(val1);
            expect(result).toBeLessThanOrEqual(val2);
        }));
    });

    describe(`#isEqualArrayOfObjects()`, () => {
        it(`Shoud return 'true' for { tstKey: 'tstValue' } and { tstKey: 'tstValue' }`, () => {
            // Arrange
            const value = { tstKey: 'tstValue' };
            const valueToCheck = { tstKey: 'tstValue' };

            // Act
            const result = _utils.isEqualArrayOfObjects(value, valueToCheck);

            // Assert
            expect(result).toEqual(true);
        });

        it(`Shoud return 'false' for { tstKey: 'tstValue1' } and { tstKey: 'tstValue2' }`, () => {
            // Arrange
            const value2 = { tstKey: 'tstValue1' };
            const valueToCheck2 = { tstKey: 'tstValue2' };

            // Act
            const result = _utils.isEqualArrayOfObjects(value2, valueToCheck2);

            // Assert
            expect(result).toEqual(false);
        });

        it(`Shoud return 'false' for { tstKey: 'tstValue' } and { tstKey2: 'tstValue' }`, () => {
            // Arrange
            const value2 = { tstKey: 'tstValue1' };
            const valueToCheck2 = { tstKey: 'tstValue2' };

            // Act
            const result = _utils.isEqualArrayOfObjects(value2, valueToCheck2);

            // Assert
            expect(result).toEqual(false);
        });

        it(`Shoud return 'false' for [{ tstKey: 'tstValue' }] and [{ tstKey2: 'tstValue' }]`, () => {
            // Arrange
            const value2 = { tstKey: 'tstValue1' };
            const valueToCheck2 = { tstKey: 'tstValue2' };

            // Act
            const result = _utils.isEqualArrayOfObjects(value2, valueToCheck2);

            // Assert
            expect(result).toEqual(false);
        });

        it(`Shoud return 'false' for [{ tstKey: 'tstValue' }] and [{ tstKey: 'tstValue' }]`, () => {
            // Arrange
            const value2 = { tstKey: 'tstValue1' };
            const valueToCheck2 = { tstKey: 'tstValue2' };

            // Act
            const result = _utils.isEqualArrayOfObjects(value2, valueToCheck2);

            // Assert
            expect(result).toEqual(false);
        });
    });

    describe(`#compareObjects()`, () => {
        it(`Shoud return 'true' for { tstKey: 'tstValue' } and { tstKey: 'tstValue' }`, () => {
            // Arrange
            const value = { tstKey: 'tstValue' };
            const valueToCheck = { tstKey: 'tstValue' };

            // Act
            const result = _utils.compareObjects(value, valueToCheck);

            // Assert
            expect(result).toEqual(true);
        });

        it(`Shoud return 'false' for { tstKey: 'tstValue1' } and { tstKey: 'tstValue2' }`, () => {
            // Arrange
            const value2 = { tstKey: 'tstValue1' };
            const valueToCheck2 = { tstKey: 'tstValue2' };

            // Act
            const result = _utils.compareObjects(value2, valueToCheck2);

            // Assert
            expect(result).toEqual(false);
        });

        it(`Shoud return 'false' for { tstKey: 'tstValue' } and { tstKey2: 'tstValue' }`, () => {
            // Arrange
            const value2 = { tstKey: 'tstValue1' };
            const valueToCheck2 = { tstKey: 'tstValue2' };

            // Act
            const result = _utils.compareObjects(value2, valueToCheck2);

            // Assert
            expect(result).toEqual(false);
        });

        it(`Shoud return 'true' for 'true' and 'true'`, () => {
            // Arrange

            // Act
            const result = _utils.compareObjects(true, true);

            // Assert
            expect(result).toEqual(true);
        });

        it(`Shoud return 'false' for 'true' and 'false'`, () => {
            // Arrange

            // Act
            const result = _utils.compareObjects(true, false);

            // Assert
            expect(result).toEqual(false);
        });

        it(`Shoud return 'false' for (0) and (1)`, () => {
            // Arrange

            // Act
            const result = _utils.compareObjects(0, 1);

            // Assert
            expect(result).toEqual(false);
        });

        it(`Shoud return 'true' for (1) and (1)`, () => {
            // Arrange

            // Act
            const result = _utils.compareObjects(1, 1);

            // Assert
            expect(result).toEqual(true);
        });

        it(`Shoud return 'true' for 'tstStr' and 'tstStr'`, () => {
            // Arrange

            // Act
            const result = _utils.compareObjects('tstStr', 'tstStr');

            // Assert
            expect(result).toEqual(true);
        });

        it(`Shoud return 'false' for 'tstStr' and 'tstStr2'`, () => {
            // Arrange

            // Act
            const result = _utils.compareObjects('tstStr', 'tstStr2');

            // Assert
            expect(result).toEqual(false);
        });
    });
});
