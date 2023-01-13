/**
 * This function will copy some text into clipboard.
 * 
 * @param text string
 */
export const copy = (text: string) => {
  navigator.clipboard.writeText(text)
}