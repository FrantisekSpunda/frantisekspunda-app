import React from 'react'
import { Grid } from 'components'
import { Link } from '@inertiajs/inertia-react'

const Topbar: React.FC = () => {
  return (
    <Grid type="fixed" className="w-full">
      <Grid.useBox w={12}>
        <div className="mt-8 mb-10 w-full py-3 box [&>a>h4]:italic [&>a>h4]:text-white [&>a]:no-underline [&>a>h4]:no-underline flex justify-around">
          <Link href="/">
            <h4>Domů</h4>
          </Link>
          <Link href="/data">
            <h4>Data</h4>
          </Link>
          <Link href="/login">
            <h4>Login</h4>
          </Link>
        </div>
      </Grid.useBox>
    </Grid>
  )
}

export default React.memo(Topbar)
