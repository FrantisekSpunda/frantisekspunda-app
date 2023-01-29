import React from 'react'
import { WidgetBase, WidgetText } from 'types'
import { Grid } from 'components'

const Text: React.FC<WidgetBase & WidgetText> = (props) => {
  return (
    <Grid.useBox w={props.columnSpan}>
      <p>{props.props.text}</p>
    </Grid.useBox>
  )
}

export default React.memo(Text)
