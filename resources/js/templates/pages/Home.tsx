import React from 'react'
import { PageProps, WidgetProps } from 'types'
import { Head } from '@inertiajs/inertia-react'
import Table from './widgets/widgets.Table'
import Form from './widgets/widgets.Form'
import Input from './widgets/widgets.Input'
import Button from './widgets/widgets.Button'
import Text from './widgets/widgets.Text'
import { Grid } from 'components'

const HomePage: React.FC<PageProps> = (props) => {
  return (
    <>
      <Head title={props.title} />
      <Grid type="fixed">
        <MapWidgets widgets={props.widgets} />
      </Grid>
    </>
  )
}

export const MapWidgets: React.FC<{ widgets?: WidgetProps[] }> = ({
  widgets,
}) => {
  return widgets?.length ? (
    <div>
      {widgets.map((item, i) => {
        return <Widget {...item} key={i} />
      })}
    </div>
  ) : null
}

const Widget: React.FC<WidgetProps> = (props) => {
  switch (props.type) {
    case 'table':
      return <Table {...props} />
    case 'form':
      return <Form {...props} />
    case 'input':
      return <Input {...props} />
    case 'button':
      return <Button {...props} />
    case 'text':
      return <Text {...props} />
  }
}

export default HomePage
