import Icon from 'components/Icon'
import { cn, unique } from 'utils'
import React from 'react'
import { DataProps } from '.'

interface DataListProps {
  data: DataProps[]
  focused: number
}

const DataList: React.FC<DataListProps> = ({ data, focused }) => {
  const lists = unique(data.map((v) => v.list).filter((v) => v !== undefined))
  const focusedId = data[focused]?.id || 0

  return (
    <ul
      onMouseDown={(e) => e.preventDefault()}
      className={
        'absolute top-[calc(100%_+_0.5rem)] left-0 w-full z-20 bg-white py-4 rounded-lg flex flex-col opacity-0 pointer-events-none transition-opacity overflow-hidden shadow-autocomplete'
      }
    >
      <span className="px-4 text-sm">Searching for...</span>
      <ul className="flex px-4 py-2">
        <li className="flex items-center px-1.5 py-1 border border-eee rounded mr-1 text-sm leading-4 font-bold cursor-pointer hover:bg-hover">
          <Icon
            iconClassName="text-black text-[20px]"
            className="w-4 h-4 mr-1"
            type="outlined"
          >
            description
          </Icon>
          Pages
        </li>
        <li className="flex items-center px-1.5 py-1 border border-eee rounded mr-1 text-sm leading-4 font-bold cursor-pointer hover:bg-hover">
          <Icon
            iconClassName="text-black text-[20px]"
            className="w-4 h-4 mr-1"
            type="outlined"
          >
            group
          </Icon>
          Users
        </li>
        <li className="flex items-center px-1.5 py-1 border border-eee rounded mr-1 text-sm leading-4 font-bold cursor-pointer hover:bg-hover">
          <Icon
            iconClassName="text-black text-[20px]"
            className="w-4 h-4 mr-1"
            type="outlined"
          >
            add_photo_alternate
          </Icon>
          Assets
        </li>
      </ul>
      <ul>
        {data
          .filter((v) => v.type === 'earlier')
          ?.map((value, key: number) => (
            <li
              key={key}
              className={cn(
                'px-4 py-2 flex items-center relative cursor-pointer hover:bg-hover',
                focusedId === value.id &&
                  'bg-hover before:block before:w-1 before:h-full before:bg-red before:absolute before:left-0'
              )}
            >
              <Icon
                iconClassName="text-black text-[20px]"
                className="!w-6 !h-6"
                type="outlined"
              >
                search
              </Icon>
              <p className="ml-2 mr-1">{value.name}</p>
            </li>
          ))}
      </ul>
      {lists.map((list, key) => (
        <div key={key}>
          <span className="px-4 text-sm">{list}</span>
          <ul>
            {data
              .filter((v) => v.list === list)
              .map((v, key) => (
                <li
                  key={v.id}
                  className={cn(
                    'px-4 py-2 flex items-center cursor-pointer hover:bg-hover relative',
                    focusedId === v.id &&
                      'bg-hover before:block before:w-1 before:h-full before:bg-red before:absolute before:left-0'
                  )}
                >
                  <div className="w-6 h-6 rounded-full bg-fill" />
                  <p className="ml-2">{v.name}</p>
                  {!!v.subname && (
                    <span className="ml-2 text-base text-disabled">
                      {v.subname}
                    </span>
                  )}
                </li>
              ))}
          </ul>
        </div>
      ))}
    </ul>
  )
}

export default React.memo(DataList)
