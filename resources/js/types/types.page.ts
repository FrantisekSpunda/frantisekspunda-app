import { IntRange } from 'types';

export interface PageProps {
  title: string
  description: string
  widgets: {
    type: 'table'
    label: string
    name: string
    columnSpan: IntRange<1, 12>
    data: {
      id: number
      [x: string]: string | number
    }[]
  }[]
  route?: {
    name: string
    url: string
  }
  breadcrumbs?: {
    name: string,
    url: string
  }[]
}