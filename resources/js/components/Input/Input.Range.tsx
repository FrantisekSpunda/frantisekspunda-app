import { useField } from 'formik'
import Label from './Label'
import { cn } from 'utils'
import React from 'react'

interface InputRangeProps
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  min: number
  max: number
  name: string
  label?: string
  id?: string
  prefix?: string
  double?: boolean
}

const InputRange: React.FC<InputRangeProps> = ({
  min,
  max,
  label,
  id,
  prefix,
  double = false,
  ...props
}) => {
  // Fields values and attributes
  const [field_1, meta_1, helpers_1] = useField<number>({
    ...props,
    name: props.name + (double ? '_min' : ''),
  })
  const [field_2, meta_2, helpers_2] = useField<number>({
    ...props,
    name: props.name + '_max',
  })

  // References for all needed elements
  const div = React.useRef<HTMLDivElement>(null)
  const span_1 = React.useRef<HTMLSpanElement>(null)
  const span_2 = React.useRef<HTMLSpanElement>(null)
  const container = div.current as HTMLDivElement
  const point_1 = span_1.current as HTMLSpanElement
  const point_2 = span_2.current as HTMLSpanElement

  // ger range of possible values
  const range = React.useMemo(() => max - min, [min, max])

  const setValue = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const onclickPos = e.clientX - container?.offsetLeft
    // set value from mouse position and range position
    let value = Math.round(
      ((e.clientX - container?.offsetLeft) / container?.clientWidth) * range +
        min
    )

    // get value in range
    value = value < min ? min : value > max ? max : value

    // set position of points
    if (double) {
      Math.abs(onclickPos - point_1?.offsetLeft) <
      Math.abs(point_2?.offsetLeft - onclickPos)
        ? helpers_1.setValue(
            value > field_2.value - 1 ? field_2.value - 1 : value
          )
        : helpers_2.setValue(
            value < field_1.value + 1 ? field_1.value + 1 : value
          )
    } else {
      helpers_1.setValue(value)
    }
  }

  // Handle all mouse events
  const [mouseDown, setMouse] = React.useState(false)
  const onMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setMouse(true)
    setValue(e)
  }
  const onMouseUp = (e: React.MouseEvent<HTMLDivElement>) => {
    setMouse(false)
  }
  if (typeof window !== 'undefined' && mouseDown) {
    document.onmousemove = (e: any) => {
      container?.classList.contains('down') && setValue(e)
    }
    document.onmouseup = (e: any) => {
      setMouse(false)
    }
  }

  // Width of second line
  const width = double
    ? point_2?.offsetLeft - point_1?.offsetLeft
    : point_1?.offsetLeft

  return (
    <div className="w-min">
      <Label text={label} id={id} props={props} className="mb-1" />

      {/* CONTAINER */}
      <div
        ref={div}
        className={cn(
          'relative w-full h-4 cursor-pointer select-none rounded-full outline-blue-60 outline-offset-2',
          props.className,
          mouseDown && 'down'
        )}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
      >
        {/* LINES */}
        <div className="absolute w-full h-2 -translate-y-1/2 rounded-full bg-gray-70 top-1/2" />
        <div
          className="absolute w-full h-2 -translate-y-1/2 rounded-full bg-red-70 top-1/2"
          style={{
            width: width ?? '100%',
            left: double ? point_1?.offsetLeft : 0,
          }}
        />

        {/* POINTS */}
        <span
          ref={span_1}
          className={cn(
            'absolute w-4 h-4 top-1/2 -translate-y-1/2 rounded-full bg-gray-50 pointer-events-none'
          )}
          style={{
            left: `calc(${((field_1.value - min) / range) * 100}% - ${
              ((field_1.value - min) / range) * 16
            }px)`,
          }}
        />
        {!!double && (
          <span
            ref={span_2}
            className={cn(
              'absolute w-4 h-4 top-1/2 -translate-y-1/2 rounded-full bg-gray-50 pointer-events-none'
            )}
            style={{
              left: `calc(${((field_2.value - min) / range) * 100}% - ${
                ((field_2.value - min) / range) * 16
              }px)`,
            }}
          />
        )}
      </div>

      {/* INPUTS */}
      <div className="flex flex-row-reverse justify-between w-full">
        {!!double && (
          <>
            <span>{prefix}</span>
            <input
              type="number"
              min={min}
              max={max}
              prefix={prefix}
              className="outline-blue-60 outline-offset-2"
              style={{ width: max.toString().length * 14 + 16 }}
              {...field_2}
            />
          </>
        )}
        <span>{prefix}</span>
        <input
          type="number"
          min={min}
          max={max}
          style={{ width: max.toString().length * 14 + 16 }}
          className="outline-blue-60 outline-offset-2"
          {...field_1}
        />
      </div>
    </div>
  )
}

export default React.memo(InputRange)
