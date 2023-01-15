import React from 'react'
import { PageProps } from 'types'
import { Button, Grid, Icon } from 'components'
import { Head } from '@inertiajs/inertia-react'
import { cut } from './../../utils/utils.string'
import { Inertia } from '@inertiajs/inertia'

const HomePage: React.FC<PageProps> = (props) => {
  console.log(props.widgets[0].name)

  return (
    <>
      <Head title={props.title} />
      <Grid type="fixed">
        <Grid.useBox w={12}>
          {props.widgets.map((widget, i) => (
            <Grid.useBox w={widget.columnSpan} key={i}>
              <div className="w-full p-4 box">
                <h5 className="mb-3">{widget.label}</h5>
                <ul>
                  {widget.data.length ? (
                    <>
                      <li className="flex justify-between border-b border-border-default">
                        {Object.keys(widget.data[0]).map((key, i) => (
                          <p className="w-full p-2" key={i}>
                            {key}
                          </p>
                        ))}
                      </li>
                      {widget.data.map((data, i) => (
                        <li
                          className="flex justify-between border-b cursor-pointer border-border-default hover:bg-gray-10 active:bg-gray-20"
                          onClick={() =>
                            Inertia.visit(`/${widget.name}/${data.id}`)
                          }
                          key={i}
                        >
                          {Object.values(data).map((value, i) => (
                            <p className="w-full p-2" key={i}>
                              {cut(String(value), 10)}
                            </p>
                          ))}
                        </li>
                      ))}
                    </>
                  ) : null}
                </ul>
              </div>
            </Grid.useBox>
          ))}
        </Grid.useBox>
      </Grid>
    </>
  )
}

export default HomePage
