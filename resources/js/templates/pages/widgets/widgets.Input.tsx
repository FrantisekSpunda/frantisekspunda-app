import { Grid } from 'components'
import React from 'react'
import { WidgetBase, WidgetInputText } from 'types'
import { Input as AppInput } from 'components'

const Input: React.FC<WidgetBase & WidgetInputText> = (props) => {
  const { value, ...input } = props.props

  return (
    <Grid.useBox w={props.columnSpan}>
      <AppInput.Text {...input} name={props.name} />
    </Grid.useBox>
  )
}

export default React.memo(Input)
