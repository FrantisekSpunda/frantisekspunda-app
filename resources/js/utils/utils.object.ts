import { ObjectType } from "app/types/types.utils";

/**
 * @returns mapped object
 */
export const mapObject = <T = unknown, R = unknown>(object: Object, map: (value: T[keyof T]) => R) => {
    // const mapContent = (obj: {}) => Object.keys(obj).forEach((key, i) => obj[key] = map(obj[key])
    let copy = object
    Object.keys(copy).map((key) => {
      // if(copy[key] instanceof Object) mapContent(copy[key])
      copy[key] = map(copy[key])
    })
  
    return copy
}

mapObject({ name: 'bob', age: 19 }, (v) => v + ' xd')