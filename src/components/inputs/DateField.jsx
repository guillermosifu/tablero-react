import PropTypes from "prop-types";
import FormControl from "@mui/material/FormControl";
import { useController } from "react-hook-form";
import { Typography } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";

export const DateField = ({ name, label, control, errors = {}, ...props }) => {
  const errorValidation = errors[name]?.message?.length > 0;
  const { field } = useController({ name: name, control });
  const { value, onChange, ...restField } = field;
  return (
    <FormControl fullWidth>
      <DatePicker
        fullWidth
        format="yyyy-MM-dd"
        onChange={(value) => onChange(value)}
        value={value ? new Date(value) : null}
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
      <Typography
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
        {errorValidation && errors[name]?.message}
      </Typography>
    </FormControl>
  );
};

DateField.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  options: PropTypes.array,
  control: PropTypes.any.isRequired,
  errors: PropTypes.object.isRequired,
};
