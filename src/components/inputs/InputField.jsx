import PropTypes from "prop-types";
import FormControl from "@mui/material/FormControl";
import { TextField, Typography } from "@mui/material";
import { useController } from "react-hook-form";

export const InputField = ({ name, label, control, errors = {}, ...props }) => {
  const errorValidation = errors[name]?.message?.length > 0;
  const { field } = useController({ name: name, control });
  const { value, onChange, ...restField } = field;
  return (
    <FormControl fullWidth>
      <TextField
        fullWidth
        onChange={(event) => onChange(event ? event.target.value : event)}
        value={value}
        label={label}
        autoComplete="off"
        sx={{
          "& .MuiInputLabel-root": {
            color: `${errorValidation && "#EF4444"}`,
          }, //styles the label
          "& .MuiOutlinedInput-root": {
            "& > fieldset": {
              borderColor: `${errorValidation && "#EF4444"}`,
            },
          },
          "& .MuiOutlinedInput-root.Mui-focused": {
            "& > fieldset": {
              borderColor: `${errorValidation && "#EF4444"}`,
            },
          },
          "& .MuiOutlinedInput-root:hover": {
            "& > fieldset": {
              borderColor: `${errorValidation && "#EF4444"}`,
            },
          },
        }}
        {...props}
        {...restField}
      />
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
          maxHeight: "19px",
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        }}
      >
        {errors[name]?.message}
      </Typography>)}
    </FormControl>
  );
};

InputField.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  options: PropTypes.array,
  control: PropTypes.any.isRequired,
  errors: PropTypes.object.isRequired,
};
