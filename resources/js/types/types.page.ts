export interface PageBuilderProps {
  title: string
  description: string
  route?: {
    name: string
    url: string
  }
  breadcrumbs?: {
    name: string,
    url: string
  }[]
}