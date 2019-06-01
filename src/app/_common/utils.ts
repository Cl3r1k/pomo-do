export class Utils {

    public randomRangeInteger(min: number, max: number): number {
        const rnd = min - 0.5 + Math.random() * (max - min + 1);
        return Math.round(rnd);
    }

    public isEqualArrayOfObjects(value, valueToCheck): boolean {

        // Get the value type ('typeof' returns 'object' for arrays and objects)
        const typeValue = Object.prototype.toString.call(value);

        // If the two arguments are not the same type, set 'result' to false
        if (typeValue !== Object.prototype.toString.call(valueToCheck)) {
            return false;
        }

        // If items are not an object or array, set 'result' to false
        if (['[object Array]', '[object Object]'].indexOf(typeValue) < 0) {
            return false;
        }

        // Compare the length of the two items
        const valueLen = typeValue === '[object Array]' ? value.length : Object.keys(value).length;
        const valueToCheckLen = typeValue === '[object Array]' ? valueToCheck.length : Object.keys(value).length;

        if (valueLen !== valueToCheckLen) {
            return false;
        }

        // Compare properties
        if (typeValue === '[object Array]') {
            for (let i = 0; i < valueLen; i++) {
                if (this.compareObjects(value[i], valueToCheck[i]) === false) {
                    return false;
                }
            }
        } else {
            for (const key in value) {
                if (value.hasOwnProperty(key)) {
                    if (this.compareObjects(value[key], valueToCheck[key]) === false) {
                        return false;
                    }
                }
            }
        }

        return true;
    }

    public compareObjects(item1, item2): boolean {

        // Get the object type
        const itemType = Object.prototype.toString.call(item1);

        // If an object or array, compare recursively
        if (['[object Array]', '[object Object]'].indexOf(itemType) >= 0) {
            if (!this.isEqualArrayOfObjects(item1, item2)) {
                return false;
            }
        } else {
            if (itemType !== Object.prototype.toString.call(item2)) {
                return false;
            }

            console.log('%c value and valueToCheck', 'color: green;', item1, item1);

            // If it's a function, convert to a string and compare, otherwise, just compare
            if (itemType === '[object Function]') {
                if (item1.toString() !== item2.toString()) {
                    return false;
                } else {
                    if (item1 !== item2) {
                        return false;
                    }
                }
            }
        }

        return true;
    }

}
