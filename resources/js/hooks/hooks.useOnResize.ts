import React from "react"

function debounce(fn: () => void, ms: number) {
  let timer: any
  return () => {
    clearTimeout(timer)
    timer = setTimeout(() => {
      timer = null
      fn()
    }, ms)
  };
}

type useOnResizeType = (
  options?: {
    timeout?: number
  }
) => ({
  width: number,
  height: number
})


const useOnResize: useOnResizeType = (options) => {
  const [dimensions, setDimensions] = React.useState({ height: 0, width: 0 })

  React.useEffect(() => {
    const debouncedHandleResize = debounce(() => {
      setDimensions({ height: window.innerHeight, width: window.innerWidth })
    }, options?.timeout || 1000)

    window.addEventListener('resize', debouncedHandleResize)

    return () => {
      window.removeEventListener('resize', debouncedHandleResize)
    
      }
  })

  return dimensions
}

export default useOnResize