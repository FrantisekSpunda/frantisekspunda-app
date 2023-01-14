import React from 'react'
import { render } from 'react-dom'
import { createInertiaApp } from '@inertiajs/inertia-react'
import { InertiaProgress } from '@inertiajs/progress'
import Layout from './templates/Layout'
import { Store, Page } from './hooks'

InertiaProgress.init({
  color: '#000000',
})

createInertiaApp<any>({
  resolve: (name) => import(`./templates/pages/${name}.tsx`),
  setup({ el, App, props }) {
    console.log(props)

    render(
      <Store>
        <Page store={props.initialPage.props}>
          <Layout {...props}>
            <App {...props} />
          </Layout>
        </Page>
      </Store>,
      el
    )
  },
})
