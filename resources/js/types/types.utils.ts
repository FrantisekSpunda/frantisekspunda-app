/**
 * Some random object
 */
export type ObjectType<P = any> = {
  [x: string | number]: P
}

/**
 * Get type of single Element from array of Elements
 * @param 
 */
export type ArrElement<ArrType> = ArrType extends readonly (infer ElementType)[]
  ? ElementType
  : never;

/**
 * Takes interface. Return same interface but parameters are optional
 * @param T interface
 */
export type Partial<T> = {
  [P in keyof T]?: T[P];
}

/**
 * Create type of range of posible numbers in typescript
 */
type Enumerate<N extends number, Acc extends number[] = []> = Acc['length'] extends N
  ? Acc[number]
  : Enumerate<N, [...Acc, Acc['length']]>

export type IntRange<F extends number, T extends number> = Exclude<Enumerate<T>, Enumerate<F>>