import PropTypes from "prop-types";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Typography } from "@mui/material";
import { useController } from "react-hook-form";

export const SelectField = ({
  name,
  label,
  options,
  control,
  errors = {},
  ...props
}) => {
  const errorValidation = errors[name]?.message?.length > 0;
  const { field } = useController({ name: name, control });
  const { value, onChange, ...restField } = field;
  return (
    <FormControl fullWidth>
      {label && (
        <InputLabel
          sx={{
            color: `${errorValidation && "#EF4444"}`,
            "&.Mui-focused": {
              color: `${errorValidation && "#EF4444"}`,
            },
          }}
          id={name}
        >
          {label}
        </InputLabel>
      )}
      <Select
        onChange={(event) => onChange(event ? event.target.value : event)}
        value={value}
        labelId={name}
        label={label}
        sx={{
          ".MuiOutlinedInput-notchedOutline": {
            borderColor: `${errorValidation && "#EF4444"}`,
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: `${errorValidation && "#EF4444"}`,
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: `${errorValidation && "#EF4444"}`,
          },
          ".MuiSvgIcon-root ": {
            fill: `${errorValidation && "#EF4444"}`,
          },
        }}
        {...props}
        {...restField}
      >
        {options &&
          options.length > 0 &&
          options.map((opt, index) => (
            <MenuItem key={index} value={opt.value}>
              {opt.label}
            </MenuItem>
          ))}
      </Select>
      {errorValidation && (<Typography
        variant="subtitle2"
        component="p"
        className="text-start text-xs text-color_secondary pl-2"
        style={{
          textAlign: "start",
          fontSize: "12px",
          color: "#EF4444",
          paddingLeft: "6px",
          height: "19px",
        }}
      >
        {errors[name]?.message}
      </Typography>)}
    </FormControl>
  );
};

SelectField.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  options: PropTypes.array,
  control: PropTypes.any.isRequired,
  errors: PropTypes.object.isRequired,
};
