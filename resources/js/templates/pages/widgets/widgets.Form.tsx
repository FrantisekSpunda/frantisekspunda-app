import { Grid } from 'components'
import { Formik, Form as FormikForm } from 'formik'
import React from 'react'
import { WidgetBase, WidgetForm, WidgetInputText } from 'types'
import { MapWidgets } from '../Home'
import * as yup from 'yup'

const Form: React.FC<WidgetBase & WidgetForm> = (props) => {
  const inputs =
    props.children
      ?.filter((child) => child.type === 'input')
      ?.map((child, i) => {
        const { name, ...input } = child as WidgetInputText & WidgetBase
        return [name, input] as [string, Omit<WidgetInputText, 'name'>]
      }) || []

  yup.setLocale({})

  const initialValues = Object.fromEntries(
    inputs.map((input) => [input[0], input[1].props.value || ''])
  )

  const inputValidation = (input: Omit<WidgetInputText['props'], 'name'>) => {
    if (input.rules.includes('string')) {
      let validation = yup.string()

      if (input.rules.includes('email'))
        validation = validation.email(
          'Musí být zadán správný formát pro email (bobek@email.com)'
        )

      if (input.rules.includes('required'))
        validation = validation.required('Pole je povinné')

      return validation
    } else {
      return yup.string()
    }
  }

  const validationSchema = yup
    .object()
    .shape(
      Object.fromEntries(
        inputs.map((input) => [input[0], inputValidation(input[1].props)])
      )
    )

  return (
    <Grid.useBox w={props.columnSpan}>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        enableReinitialize
        onSubmit={() => {}}
      >
        <FormikForm className="w-full p-4 box">
          <Grid type="fill">
            <Grid.useBox w={12}>
              <h5 className="mb-3">{props.props.label}</h5>
            </Grid.useBox>
            {props.children?.length ? (
              <MapWidgets widgets={props.children} />
            ) : null}
          </Grid>
        </FormikForm>
      </Formik>
    </Grid.useBox>
  )
}

export default React.memo(Form)
