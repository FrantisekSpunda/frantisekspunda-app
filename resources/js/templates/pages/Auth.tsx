import React, { Component } from 'react'
import { Form, Formik, FormikHelpers } from 'formik'
import { Input, Button, Hr, Grid } from 'components'
import { useMessage, usePage } from 'hooks'
import * as yup from 'yup'
import { Link } from '@inertiajs/inertia-react'
import Three from '../../components/Three'
import { Inertia } from '@inertiajs/inertia'

const PageAuth: React.FC = () => {
  const { page } = usePage()
  const { setMessage } = useMessage()

  const validationLogin = yup.object().shape({
    email: yup
      .string()
      .email('Email musí mít správný formát. Například pepa@mlaticka.com')
      .required('Email je povinný')
      .min(2),
    password: yup.string().required('Heslo je pro přihlášení povinné'),
  })

  const formValues = {
    email: '',
    password: '',
  }

  const onSubmit = async (
    values: typeof formValues,
    actions: FormikHelpers<typeof formValues>
  ) => {
    actions.setSubmitting(true)

    // const { status } = await Api.login(values)

    // switch (status) {
    //   case 'success': {
    //     actions.setSubmitting(false)
    //     router.push('/')
    //   }
    //   case 'error': {
    //     actions.setSubmitting(false)
    Inertia.visit('/')
    setMessage({ type: 'info', text: 'Funkce přihlašování zatím není přidaná' })
    //   }
    // }
  }

  return (
    <Grid type="fill">
      <Grid.useBox w={2} />
      <Grid.useBox w={5} className="flex items-center !h-[calc(100vh-20px)]">
        <Three />
      </Grid.useBox>
      <Grid.useBox w={3} className="flex items-center !h-[calc(100vh-20px)] ">
        <Formik
          initialValues={formValues}
          validationSchema={validationLogin}
          onSubmit={onSubmit}
        >
          <Form className="w-full px-16 py-20 box">
            <h3 className="pb-10 italic">{page.title}</h3>

            <Input.Text
              type="email"
              name="email"
              placeholder="Emailová adresa"
              className="mt-5"
              required
            />
            <Input.Text
              type="password"
              name="password"
              id="password"
              placeholder="Vaše heslo"
              required
              className="mt-5"
            />
            <div className="flex flex-col items-center mt-20">
              <Button color="primary" submit>
                Přihlásit se
              </Button>
              <p className="mt-5">
                Nemáte účet? <Link href="#">Registrace</Link>
              </p>
            </div>
          </Form>
        </Formik>
      </Grid.useBox>
      <Grid.useBox w={2} />
    </Grid>
  )
}

export default PageAuth
