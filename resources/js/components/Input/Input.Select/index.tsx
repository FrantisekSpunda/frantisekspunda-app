import React from 'react'
import { FieldHookConfig, useField } from 'formik'
import { cn } from 'utils'
import Input from '..'
import DataList, { DataProps } from './DataList'
import { InputTextProps } from './../Input.Text'
import { Icon } from 'components'

export interface InputSelectProps extends InputTextProps {
  data: DataProps[]
}

const InputSelect: React.FC<InputSelectProps> = ({ data, ...props }) => {
  const [field, meta, helpers] = useField(props as FieldHookConfig<string>)
  const [focused, setFocused] = React.useState(0)
  const [open, setOpen] = React.useState(false)
  const ref = React.createRef<HTMLUListElement>()

  // If is select open this will change focus
  // If is select closed this will change DATA and focus
  const arrowControl = (key: 'ArrowDown' | 'ArrowUp') => {
    setFocused((prev) => {
      const value =
        key === 'ArrowDown'
          ? prev === data.length - 1
            ? 0
            : prev + 1
          : prev === 0
          ? data.length - 1
          : prev - 1

      !open && helpers.setValue(data[value].value)
      return value
    })
  }

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Just run arrowControl
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') arrowControl(e.key)

    // Open select with Spacebar
    if (e.key === ' ') setOpen((prev) => !prev)

    // Open select and choose selected option with Enter
    if (e.key === 'Enter') {
      if (open) {
        helpers.setValue(data[focused].value)
        setOpen(false)
      } else {
        setOpen(true)
      }
    }

    props?.onKeyDown && props.onKeyDown(e)
  }

  const onBlur = (e: React.FocusEvent<HTMLInputElement, Element>) => {
    setOpen(false)

    field.onBlur(e)
  }

  const onClick = (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
    setOpen((prev) => !prev)

    props.onClick && props?.onClick(e)
  }

  // * Set focus on selected value when open is changed.
  React.useEffect(() => {
    // Set focus on selected value
    setFocused(field.value ? data.map((v) => v.value).indexOf(field.value) : 0)

    // Scroll to selected value
    const list = ref.current
    const item = ref.current?.children[
      data.map((v) => v.value).indexOf(field.value)
    ] as HTMLLIElement
    list?.scrollTo({
      top: item?.offsetTop - 20,
    })
  }, [data, open])

  // Handle scrolling to focused value after focus is changed
  React.useEffect(() => {
    const list = ref.current as HTMLUListElement
    const item = list?.children[focused] as HTMLLIElement

    if (list?.clientHeight < list?.scrollHeight) {
      if (focused === 0) {
        list?.scrollTo({
          top: 0,
        })
      } else if (focused === list.children.length - 1) {
        list?.scrollTo({
          top: list.scrollHeight,
        })
      } else if (
        list?.scrollTop + list?.clientHeight <
        item?.offsetTop + item?.clientHeight
      ) {
        ref?.current?.scrollBy({
          top: 44,
          behavior: 'smooth',
        })
      } else if (list?.scrollTop > item?.offsetTop) {
        list?.scrollBy({
          top: -44,
          behavior: 'smooth',
        })
      }
    }
  }, [focused])

  return (
    <div className={cn('w-full relative')}>
      <Input.Text
        className="[&>div]:cursor-pointer select-none"
        inputClassName="cursor-pointer pointer-events-none select-none"
        {...field}
        {...props}
        onBlur={onBlur}
        onKeyDown={onKeyDown}
        readOnly={true}
        icon="group"
        controlProps={{
          onMouseDown: (e) => e.preventDefault(),
          onClick: onClick,
        }}
        after={
          <Icon
            className="pointer-events-none"
            iconClassName={cn(
              'select_drop_icon transition-transform',
              open && 'rotate-180'
            )}
          >
            keyboard_arrow_down
          </Icon>
        }
      />
      <DataList
        ref={ref}
        data={data}
        focused={focused}
        helpers={helpers}
        field={field}
        open={open}
        setOpen={setOpen}
      />
    </div>
  )
}

export default React.memo(InputSelect)
