import React from 'react'
import { FormikHelpers } from 'formik'
import { Grid } from 'components'
import { useMessage, usePage } from 'hooks'
import * as yup from 'yup'
import Three from '../../components/Three'
import { Inertia } from '@inertiajs/inertia'
import Form from './widgets/widgets.Form'

const PageAuth: React.FC = () => {
  const { page } = usePage()

  return (
    <Grid type="fill">
      <Grid.useBox w={2} />
      <Grid.useBox w={5} className="flex items-center !h-[calc(100vh-20px)]">
        <Three />
      </Grid.useBox>
      <Form
        name={'auth-form'}
        type={'form'}
        props={{ label: page.title }}
        columnSpan={3}
        children={page.widgets}
      />
      <Grid.useBox w={2} />
    </Grid>
  )
}

export default PageAuth
