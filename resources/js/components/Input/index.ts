import InputAutocomplete from './Input.Autocomplete'
import InputCheckBox from './Input.CheckBox'
import InputSelect from './Input.Select'
import InputText from './Input.Text'
import InputTextarea from './Input.Textarea'
import InputRadio from './Input.Radio';
import Error from './Error'
import Label from './Label';
import InputRange from './Input.Range';

const Input = {
  Text: InputText,
  Select: InputSelect,
  Autocomplete: InputAutocomplete,
  Textarea: InputTextarea,
  Checkbox: InputCheckBox,
  Radio: InputRadio,
  Error: Error,
  Label: Label,
  Range: InputRange
}

export default Input