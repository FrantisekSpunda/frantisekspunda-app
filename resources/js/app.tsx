import React from 'react'
import { render } from 'react-dom'
import { createInertiaApp, Head } from '@inertiajs/inertia-react'
import { InertiaProgress } from '@inertiajs/progress'
import Layout from './templates/Layout'
import { Store, Page } from './hooks'

InertiaProgress.init({
  color: '#444bad',
})

createInertiaApp<any>({
  resolve: (name) => import(`./templates/pages/${name}.tsx`),
  setup({ el, App, props }) {
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
