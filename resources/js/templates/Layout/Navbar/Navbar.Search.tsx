import { Input } from 'app/components'
import { Formik } from 'formik'

import { DataProps } from './../../../components/Input/Input.Autocomplete/index'

const dataInput: DataProps[] = [
  {
    id: 1,
    name: 'pepek',
    type: 'earlier',
  },
  {
    id: 2,
    name: 'krysa',
    type: 'earlier',
  },
  {
    id: 21,
    name: 'matej',
    type: 'earlier',
  },
  {
    id: 31,
    name: 'Matěj Křenek',
    subname: 'matej.trupka@gmail.com',
    type: 'searched',
    list: 'Users',
  },
  {
    id: 41,
    name: 'František Špunda',
    subname: 'spundafr@gmail.com',
    type: 'searched',
    list: 'Users',
  },
  {
    id: 51,
    name: 'Tomáš Křenek',
    subname: 'pepek.namornik@gmail.com',
    type: 'searched',
    list: 'Users',
  },
  {
    id: 3,
    name: 'O nás',
    subname: '/about-us',
    type: 'searched',
    list: 'Pages',
  },
  {
    id: 4,
    name: 'Dashboard',
    subname: '/home',
    type: 'searched',
    tags: ['Template'],
    list: 'Pages',
  },
  {
    id: 5,
    name: 'Bobek',
    subname: '/hovno',
    type: 'searched',
    tags: ['Smradlavé', 'Hnědé'],
    list: 'Pages',
  },
]

const Search: React.FC = () => {
  return (
    <Formik initialValues={{ input_search: '' }} onSubmit={() => {}}>
      <Input.Autocomplete
        name="lol_trol"
        type="text"
        id="loek_trojfkger"
        placeholder="Hledat"
        icon="search"
        required
        data={dataInput}
        className="w-6/12"
        contentClassName="bg-main border-none"
      />
    </Formik>
  )
}

export default Search
