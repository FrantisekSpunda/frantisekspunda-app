import React from 'react'
import { useFormikContext } from 'formik'
import { WidgetBase, WidgetButton } from 'types'
import { Button as AppButton } from 'components'
import { useMessage } from 'hooks'
import axios, { AxiosResponse } from 'axios'
import { Inertia } from '@inertiajs/inertia'

const Button: React.FC<WidgetBase & WidgetButton> = (props) => {
  const { setMessage } = useMessage()
  const formik = useFormikContext<{ [x: string]: string }>()
  const { action } = props.props

  // API call on action
  const callApi: <P = unknown>(
    type: 'delete' | 'update' | 'create',
    table: string,
    payload: P,
    id: number | null
  ) => Promise<AxiosResponse<any, any>> = async (type, table, payload, id) =>
    await axios.post(`http://localhost:8000/${table}/call/${type}`, {
      id,
      payload,
    })

  const onClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    if (action?.call) {
      if (action.call?.type !== 'delete') {
        formik?.setSubmitting(true)
        formik?.validateForm()
      }
      console.log(action)

      await formik?.submitForm()
      // if (action.call.type === 'delete') {
      try {
        const res = await callApi(
          action?.call.type,
          action.call.table,
          formik?.values,
          action?.call?.query ? Number(action.call.query[0]) : null
        )
        if (res) {
          formik?.setSubmitting(false)
          setMessage({ type: 'success', text: res.data.message })
          if (res.data.redirect) Inertia.visit(res.data.redirect.url)
        } else {
          formik?.setSubmitting(false)
          setMessage({ type: 'error', text: 'Nějakej bordel' })
        }
      } catch (err) {
        console.error(err)

        action.call.type !== 'delete' && formik?.setSubmitting(false)
        setMessage({ type: 'error', text: 'Něco se nepovedlo' })
      }
    }
    // }

    if (action?.redirect) {
      Inertia.visit(action.redirect.url)
    }
  }

  return (
    <AppButton name={props.name} {...props.props} onClick={onClick}>
      {props.props.label}
    </AppButton>
  )
}

export default React.memo(Button)
