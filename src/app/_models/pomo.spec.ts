import { TestBed, async } from '@angular/core/testing';

import { Pomo } from '@app/_models/pomo';


describe(`Model: Pomo`, () => {
    it(`Should create an instance (async)`, async(() => {
        // Arrange

        // Act

        // Assert
        expect(new Pomo('title', new Date().toISOString(), 'uuid', false)).toBeTruthy();
    }));

    it(`Should accept values in the constructor (async)`, async(() => {
        // Arrange
        let pomoTest: Pomo;

        // Act
        pomoTest = new Pomo('title test', new Date().toISOString(), 'uuid test', false);

        // Assert
        expect(pomoTest.title).toEqual('title test');
        expect(pomoTest.start_time).toBeTruthy();
        expect(pomoTest.uuid).toEqual('uuid test');
    }));

    it(`Should have initial vaules after init (async)`, async(() => {
        // Arrange
        let pomoTest: Pomo;

        // Act
        pomoTest = new Pomo('title test', new Date().toISOString(), 'uuid test', false);

        // Assert
        expect(pomoTest.canceled).toEqual(false);
        expect(pomoTest.created_time).toBeTruthy();
        expect(pomoTest.deleted).toEqual(false);
        expect(pomoTest.duration).toEqual(1500);
        expect(pomoTest.end_time).toBeTruthy();
        expect(pomoTest.manual).toEqual(false);
        expect(pomoTest.updated_time).toBeTruthy();
        expect(pomoTest.__accound_id).toEqual('123456');
        expect(pomoTest.__dirty).toEqual(false);
        expect(pomoTest._local_created_time).toBeTruthy();
        expect(pomoTest._local_updated_time).toBeTruthy();
        expect(pomoTest._local_end_time).toBeTruthy();
        expect(pomoTest._local_start_time).toBeTruthy();
        expect(pomoTest._local_deleted_time).toBeNull();
    }));

    it(`Should have not null 'created_time' and 'deleted_time' to be null after init (async)`, async(() => {
        // Arrange
        let pomoTest: Pomo;

        // Act
        pomoTest = new Pomo('title', new Date().toISOString(), 'uuid', false);

        // Assert
        expect(pomoTest.created_time).toBeTruthy();
        expect(pomoTest.deleted_time).toBeNull();
    }));
});
