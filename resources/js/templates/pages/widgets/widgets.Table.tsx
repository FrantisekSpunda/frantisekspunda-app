import React from 'react'
import { Grid } from 'components'
import { Inertia } from '@inertiajs/inertia'
import { WidgetBase, WidgetTable } from 'types'
import { cut } from 'utils'

const Table: React.FC<WidgetBase & WidgetTable> = (props) => {
  return (
    <Grid.useBox w={props.columnSpan}>
      <div className="w-full p-4 box">
        <h5 className="mb-3">{props.props.label}</h5>
        <ul>
          {props.props.data.length ? (
            <>
              <li className="flex justify-between border-b border-border-default">
                {Object.keys(props.props.data[0]).map((key, i) => (
                  <p className="w-full p-2" key={i}>
                    {key}
                  </p>
                ))}
              </li>
              {props.props.data.map((data, i) => (
                <li
                  className="flex justify-between border-b cursor-pointer border-border-default hover:bg-gray-10 active:bg-gray-20"
                  onClick={() => Inertia.visit(`/${props.name}/${data.id}`)}
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
  )
}

export default React.memo(Table)
