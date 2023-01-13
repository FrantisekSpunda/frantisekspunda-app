import React from 'react'

type templateType = <T extends 'string' | 'array' = 'array'>(
  inputString: string,
  V: { [x: string]: any },
  options?: {
    returnType: T
  }
) => T extends 'string'
  ? string
  : T extends 'array'
  ? (string | Element)[]
  : never

/**
 * Format string to string with variables from js
 *
 * @return array of string, js functions, elements and lot of others
 */
export const template: templateType = (
  inputString,
  V,
  options = { returnType: 'array' as any }
) => {
  let returnValue: any = inputString
  const findVar = returnValue?.match(/\{\{(.*?)\}\}/g)

  findVar?.map((reg: string) => {
    returnValue = returnValue?.replace(reg, eval(reg.slice(2, reg.length - 2)))
  })

  if (options.returnType === 'array') {
    returnValue = returnValue
      ?.split('**')
      ?.map((v: string, i: number, arr: string[]) => {
        const numb = returnValue?.slice(0, 2) === '**' ? i + 1 : i

        return numb % 2 === 0 ? (
          <span className="mr-2 text-caption text-neutral-50">{v}</span>
        ) : (
          v
        )
      })
  }

  return returnValue
}
