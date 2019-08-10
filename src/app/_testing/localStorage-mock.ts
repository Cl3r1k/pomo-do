export class LocalStorageMock {
    store = {};

    localStorageMockObject = {
        getItem: (key: string): string => {
            return key in this.store ? this.store[key] : null;
        },
        setItem: (key: string, value: string) => {
            this.store[key] = `${value}`;
        },
        removeItem: (key: string) => {
            delete this.store[key];
        },
        clear: () => {
            this.store = {};
        }
    };
}
