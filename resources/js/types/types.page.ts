import { IntRange } from 'types'

export interface PageProps {
  title: string
  description: string
  widgets: WidgetProps[]
  route?: {
    name: string
    url: string
  }
  breadcrumbs?: {
    name: string
    url: string
  }[]
}

export type WidgetProps = WidgetBase & WidgetTypes

export type WidgetTypes =
  | WidgetTable
  | WidgetForm
  | WidgetInputText
  | WidgetButton

export type WidgetBase = {
  name: string
  columnSpan: IntRange<1, 12>
  props?: {}
  children?: WidgetProps[]
}

export type WidgetTable = {
  type: 'table'
  props: {
    label: string
    data: {
      id: number
      [x: string]: string | number
    }[]
  }
}

export type WidgetForm = {
  type: 'form'
  props: {
    label: string
  }
}

export type WidgetInputText = {
  type: 'input'
  props: {
    type: 'text'
    placeholder: string
    required: boolean
    value?: string
  }
}

export type WidgetButton = {
  type: 'button'
  props: {
    label: string
    type: 'submit' | 'reset' | 'submit'
    color: 'primary' | 'secondary'
  }
}
