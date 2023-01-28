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
    payload: P,
    id?: number
  ) => Promise<AxiosResponse<any, any>> = async (type, payload, id) =>
    await axios.post(`http://localhost:8000/listings/call/${type}`, {
      id,
      payload,
    })

  const onClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    if (action?.call) {
      if (action.call?.type !== 'delete') {
        formik?.setSubmitting(true)
        formik?.validateForm()
      }

      await formik?.submitForm()
      if (action.call.type === 'delete') {
        try {
          const res = await callApi(
            action?.call.type,
            formik?.values,
            action?.call?.query ? Number(action.call.query[0]) : undefined
          )
          if (res) {
            formik?.setSubmitting(false)
            setMessage({ type: 'success', text: res.data.message })
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
    }

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
