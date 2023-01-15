import React from 'react'
import { PageProps, WidgetProps } from 'types'
import { Button, Grid, Input } from 'components'
import { Head } from '@inertiajs/inertia-react'
import { cut } from 'utils'
import { Inertia } from '@inertiajs/inertia'
import { Form, Formik } from 'formik'

const HomePage: React.FC<PageProps> = (props) => {
  return (
    <>
      <Head title={props.title} />
      <Formik initialValues={{}} onSubmit={() => {}}>
        <Form>
          <Grid type="fixed">
            <MapWidgets widgets={props.widgets} />
          </Grid>
        </Form>
      </Formik>
    </>
  )
}

const MapWidgets: React.FC<{ widgets?: WidgetProps[] }> = ({ widgets }) => {
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
      return (
        <Grid.useBox w={props.columnSpan}>
          <div className="w-full p-4 box">
            <h5 className="mb-3">{props.label}</h5>
            <ul>
              {props.props.data.length ? (
                <>
                  <li className="flex justify-between border-b border-border-default">
                    {Object.keys(props.props.data[0]).map((key, i) => (
                      <p className="w-full p-2" key={i}>
                        {key}
                      </p>
                    ))}
                  </li>
                  {props.props.data.map((data, i) => (
                    <li
                      className="flex justify-between border-b cursor-pointer border-border-default hover:bg-gray-10 active:bg-gray-20"
                      onClick={() => Inertia.visit(`/${props.name}/${data.id}`)}
                      key={i}
                    >
                      {Object.values(data).map((value, i) => (
                        <p className="w-full p-2" key={i}>
                          {cut(String(value), 10)}
                        </p>
                      ))}
                    </li>
                  ))}
                </>
              ) : null}
            </ul>
          </div>
        </Grid.useBox>
      )
    case 'form':
      return (
        <Grid.useBox w={props.columnSpan}>
          <Formik
            initialValues={Object.fromEntries(
              props.children
                ?.filter((item) => item.type === 'input-text')
                .map((item) => [item.name, '']) || []
            )}
            onSubmit={() => {}}
          >
            <Form className="w-full p-4 box">
              <h5 className="mb-3">{props.label}</h5>
              <ul>
                {props.children?.length ? (
                  <MapWidgets widgets={props.children} />
                ) : null}
              </ul>
            </Form>
          </Formik>
        </Grid.useBox>
      )
    case 'input-text':
      return <Input.Text name={props.name} {...props.props} />
    case 'button':
      return (
        <Button name={props.name} {...props.props}>
          {props.label}
        </Button>
      )
  }
}

export default HomePage
