import { IntRange } from 'types';

export interface PageProps {
  title: string
  description: string
  widgets: WidgetProps[]
  route?: {
    name: string
    url: string
  }
  breadcrumbs?: {
    name: string,
    url: string
  }[]
}

export type WidgetProps = WidgetBase & WidgetTypes

export type WidgetTypes = WidgetTable | WidgetForm | WidgetInputText | WidgetButton

export type WidgetBase = {
  label: string
  name: string
  columnSpan: IntRange<1, 12>
  props?: {}
  children?: WidgetProps[]
}

export type WidgetTable = {
  type: 'table'
  props: {
      data: {
        id: number
        [x: string]: string | number
      }[]
  }
}

export type WidgetForm = {
  type: 'form',
  props: {},
}

export type WidgetInputText = {
  type: 'input-text',
  props: {
    type: 'text',
    placeholder: string,
    required: boolean
  }
}

export type WidgetButton = {
  type: 'button',
  props: {
    type: 'submit' | 'reset' | 'submit',
    color: 'primary' | 'secondary'
  }
}