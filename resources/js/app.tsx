import React from 'react'
import { render } from 'react-dom'
import { createInertiaApp } from '@inertiajs/inertia-react'
import { InertiaProgress } from '@inertiajs/progress'
import Layout from './templates/Layout'
import { Store } from './hooks'

InertiaProgress.init({
  color: '#000000',
})

createInertiaApp({
  resolve: (name) => import(`./templates/pages/${name}.tsx`),
  setup({ el, App, props }) {
    render(
      <Store>
        <Layout {...props}>
          <App {...props} />
        </Layout>
      </Store>,
      el
    )
  },
})
