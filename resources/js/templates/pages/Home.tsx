import React from 'react'
import { PageProps } from 'types'
import { Grid } from 'components'

const HomePage: React.FC<PageProps> = (props) => {
  console.log(props)

  return (
    <Grid type="fixed">
      <Grid.useBox w={12}>
        <div className="w-full h-12 rounded bg-primary-60"></div>
      </Grid.useBox>
    </Grid>
  )
}

export default HomePage
