export * from './types.page'
export * from './types.utils'
// ? ************** ICON ********************************************
/**
 * Used to add icon to element
*/
export type IconTypes = 'outlined' | 'round' | 'sharp' | 'two-tone'

export interface IconType {
  name: string
  activeName?: string
  type?: IconTypes
  className?: string
  containerClassName?: string
}
// ? ****************************************************************



// ? ************** SELECT VALUES FOR TABLE *************************
/**
 * In witch state can be checkbox of selecting items
 */
export type SelectAllValues = 'all' | 'none' | 'some'

// ? ****************************************************************



/**
 * Link component used redirect to another page
 */
export interface Link {
  name: string
  url: string
}