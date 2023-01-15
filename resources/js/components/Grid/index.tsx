import { IntRange } from 'types'
import { cn, newId } from 'utils'
import React from 'react'
import { useOnResize } from 'hooks'
import config from 'config'

const pxToRem = (number: number) => Math.floor((number / 16) * 10000) / 10000

/**
 * Context for box to get know the width of container
 */
const Context = React.createContext({
  width: pxToRem(config.theme.grid.fixedWidth),
  gapXRem: pxToRem(config.theme.grid.gapX),
  gapYRem: pxToRem(config.theme.grid.gapY),
  paddingXRem: pxToRem(config.theme.grid.paddingX),
})

/**
 * Define type of Box element that is inside Grid element
 */
type BoxType = React.FC<{
  children?: React.ReactNode
  w: IntRange<1, 13>
  m?: boolean | undefined
  className?: string | undefined
}>

type GridType = React.FC<{
  children: React.ReactNode
  type: 'fill' | 'fixed'
  className?: string
  gapX?: number
  gapY?: number
  paddingX?: number
  fixedWidth?: number
}> & { useBox: BoxType }

/**
 * Container for Boxes of grid
 * @param
 * @returns
 */
const Grid: GridType = ({
  children,
  className,
  gapX = config.theme.grid.gapX,
  gapY = config.theme.grid.gapY,
  paddingX = config.theme.grid.paddingX,
  fixedWidth = config.theme.grid.fixedWidth,
  type,
}) => {
  const ref = React.useRef<HTMLDivElement>(null)
  const [width, setWidth] = React.useState(0)
  const onResize = useOnResize({ timeout: 500 })

  const gapXRem = pxToRem(gapX)
  const gapYRem = pxToRem(gapY)
  const paddingXRem = pxToRem(paddingX)
  const fixedWidthRem = pxToRem(fixedWidth)

  React.useEffect(() => {
    setWidth(pxToRem(ref.current?.scrollWidth || 0))
  }, [onResize])

  return (
    <Context.Provider value={{ width, gapXRem, gapYRem, paddingXRem }}>
      <div
        style={{
          paddingBlock: gapYRem - gapYRem / 4 + 'rem',
        }}
        className={cn('border border-transparent', className)}
      >
        <div
          ref={ref}
          style={{
            marginBlock: '-' + gapYRem + 'rem',
            paddingInline: paddingXRem + 'rem',
            ...(type === 'fixed' ? { maxWidth: fixedWidthRem + 'rem' } : {}),
          }}
          className={cn(
            'flex flex-wrap w-full',
            type === 'fixed' ? 'mx-auto' : 'w-full'
          )}
        >
          {children}
        </div>
      </div>
    </Context.Provider>
  )
}

Grid.useBox = ({ children, w, className, m = false }) => {
  const [id, setId] = React.useState('')
  const box = React.useRef<HTMLDivElement>(null)
  const context = React.useContext(Context)

  const last =
    m ||
    !Array.from(box.current?.children || []).some((b) =>
      b.classList.contains('grid_box')
    )

  React.useEffect(() => {
    setId(newId())
  }, [])

  return (
    <div
      id={id}
      ref={box}
      className={cn('grid_box h-min', !last && 'flex flex-wrap', className)}
    >
      {children || null}
      <style>
        {`
          #${id} {
            width: calc(${
              (w / 12) * (context.width - context.paddingXRem * 2)
            }rem ${last ? '- ' + context.gapXRem + 'rem' : ''});
            
            margin-inline: ${last ? context.gapXRem / 2 + 'rem' : '0'};
            margin-block: ${last ? context.gapYRem / 2 + 'rem' : '0'};
          }
        `}
      </style>
    </div>
  )
}

export default Grid
