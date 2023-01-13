export const prepareSessionValue = (value: string | null) => {
    switch (value) {
      case 'false':
        return false
      case 'true':
        return true
      case 'undefined':
        return undefined
      default:
        return value
    }
  }