import React from 'react'
import { Form, Formik, FormikHelpers } from 'formik'
import { Input, Button } from 'components'
import { useMessage, usePage } from 'hooks'
import * as yup from 'yup'

const PageAuth: React.FC = () => {
  const { page } = usePage()
  const { setMessage } = useMessage()

  const validationLogin = yup.object().shape({
    username: yup.string().required('Uživatelké jméno je povinné').min(2),
    password: yup.string().required('Heslo je pro přihlášení povinné'),
  })

  const formValues = {
    username: 'admin',
    password: '123456789',
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
    setMessage({ type: 'error', text: 'Nebylo možné se přihlásit' })
    //   }
    // }
  }

  return (
    <div className="max-w-sm mx-auto mt-[7.5rem]">
      <h1 className="text-5xl">{page.title}</h1>
      <p className="mt-3 text-secondary">{page.description}</p>

      <Formik
        initialValues={formValues}
        validationSchema={validationLogin}
        onSubmit={onSubmit}
      >
        <Form className="mt-3">
          <Input.Text
            type="text"
            name="username"
            id="username"
            label="Uživatelské jméno"
            placeholder="Zadejte uživatelské jméno"
            required
            className="mt-5"
          />
          <Input.Text
            type="password"
            name="password"
            id="password"
            label="Heslo"
            placeholder="Zadejte vaše heslo"
            required
            className="mt-5"
          />
          <Button className="justify-center w-full mt-5 rounded" submit>
            Přihlásit se
          </Button>
        </Form>
      </Formik>
    </div>
  )
}

export default PageAuth
