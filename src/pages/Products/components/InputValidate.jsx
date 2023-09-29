import { FormControl, InputAdornment, InputLabel, OutlinedInput } from "@mui/material";
import PropTypes from 'prop-types'

export default function InputValidate (props) {

  const { label, name, register, errors, simbol } = props
  const errorValidation = errors[name]?.message?.length > 0;

  return (
    <FormControl fullWidth sx={{ m: 1 }}>
      <InputLabel color={`${errorValidation ? 'error': 'primary'}`} htmlFor="outlined-adornment-amount">{label}</InputLabel>
      <OutlinedInput
        type='number'
        color={`${errorValidation ? "error" : "primary"}`}
        id="outlined-adornment-amount"
        startAdornment={<InputAdornment position="start">{simbol}</InputAdornment>}
        placeholder='0.00'
        label={label}
        className={`${errorValidation ? "border-red-500" : ""}`}
        {...register(name)}
      />
      {errorValidation && (
        <p className="text-start text-xs text-red-500 pl-2">
          {errors[name]?.message}
        </p> )}
    </FormControl>
  )
}

InputValidate.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  errors: PropTypes.object.isRequired,
  register: PropTypes.any.isRequired,
  simbol: PropTypes.string
};
