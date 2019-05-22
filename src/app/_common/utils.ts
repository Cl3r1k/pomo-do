export class Utils {

    public randomRangeInteger(min: number, max: number): number {
        const rnd = min - 0.5 + Math.random() * (max - min + 1);
        return Math.round(rnd);
    }

    public isEqualArrayOfObjects(value, valueToCheck): boolean {

        let result = true;

        // Get the value type ('typeof' returns 'object' for arrays and objects)
        const typeValue = Object.prototype.toString.call(value);

        // If the two arguments are not the same type, set 'result' to false
        if (typeValue !== Object.prototype.toString.call(valueToCheck)) {
            result = false;
        }

        // If items are not an object or array, set 'result' to false
        if (['[object Array]', '[object Object]'].indexOf(typeValue) < 0) {
            result = false;
        }

        return true;
    }

}
