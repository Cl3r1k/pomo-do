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
    } else {    // Otherwise, do a simple comparison
      if (itemType !== Object.prototype.toString.call(item2)) {
        return false;
      }

      // If it's a function, convert to a string and compare, otherwise, just compare
      if (itemType === '[object Function]') {
        if (item1.toString() !== item2.toString()) {
          return false;
        }
      } else {
        if (item1 !== item2) {
          return false;
        }
      }
    }

    return true;
  }

  /**
   * Sort array elements with Objects, by given field in ascending (default) or descending mode.
   * If field param is not given, the objects will be sorted by their first fields.
   *
   * @param {Array<Object>} array - The destination array with objects.
   * @param {String} field - The sorting field.
   * @param {Boolean} [isDescendingMode=false] - Descending mode flag.
   * @return {Array<Object>} - Returns new sorted array with objects.
   *
   * @example:
   *   const objectArray = [
   *     { 'a': 2 },
   *     { 'b': 1 },
   *     { 'c': 5 },
   *     { 'name': 4 },
   *     { 'id': 3 },
   *   ];
   *
   *   sortArrayObjectsByField(objectArray); // => [
   *     { 'b': 1 },
   *     { 'a': 2 },
   *     { 'id': 3 },
   *     { 'name': 4 },
   *     { 'c': 5 },
   *   ]
  */
  public sortArrayObjectsByField(array: Array<Object>, field = null, isDescendingMode = false): [Object] {
    // TODO: To implement
    return [new Object()];
  }

  /**
   * Sort Object by given field in ascending (default) or descending mode.
   *
   * @param {Object} array - The destination array with objects.
   * @param {String} field - The sorting field.
   * @param {Boolean} [isDescendingMode=false] - Descending mode flag.
   * @return {Object} - Returns new sorted object.
   *
   * @example:
   *   const object = {
   *     'a': 2,
   *     'b': 1,
   *     'c': 5,
   *     'name': 4,
   *     'id': 3,
   *   };
   *
   *   sortObjectsByField(object); // => {
   *     'b': 1,
   *     'a': 2,
   *     'id': 3,
   *     'name': 4,
   *     'c': 5,
   *   }
  */
  public sortObjectByField(object: Object, field = null, isDescendingMode = false): Object {
    const sortedObject = {...object};
    console.log('sortedObject', sortedObject);
    // TODO: To implement
    // Hint ↓
    // Object.entries(obj).sort((a, b) => a[0] - b[0]);
    const resSortedObject = Object.entries(sortedObject).sort((a, b) => {
      console.log('a', a);
      console.log('b', b);
      return +a[0] - +b[0]
    });
    console.log('resSortedObject', resSortedObject);
    // https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Object/entries
    return new Object();
  }

}
