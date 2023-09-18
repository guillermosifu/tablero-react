import PropTypes from "prop-types";
import { useState } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CircularProgress from "@mui/material/CircularProgress";
import { useController } from "react-hook-form";
import { Typography } from "@mui/material";

export const SelectFieldAsync = ({
  errors = {},
  options,
  loading,
  name,
  control,
  label,
  ...props
}) => {
  const [open, setOpen] = useState(false);
  const { field } = useController({ name: name, control });
  const { value, onChange, ...restField } = field;
  const errorValidation = errors[name]?.message?.length > 0;

  return (
    <>
      <Autocomplete
        id={name}
        onChange={(_, event) => onChange(event ? event.value : event)}
        value={options?.find((x) => x.value == value) || null}
        open={open}
        onOpen={() => {
          setOpen(true);
        }}
        onClose={() => {
          setOpen(false);
        }}
        isOptionEqualToValue={(option, value) => option.value === value.value}
        getOptionLabel={(option) => option.label}
        options={options}
        loading={loading}
        disableClearable
        renderInput={(params) => (
          <TextField
            {...params}
            label={label}
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
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <>
                  {loading && <CircularProgress color="inherit" size={20} />}
                  {params.InputProps.endAdornment}
                </>
              ),
            }}
          />
        )}
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
    </>
  );
};

SelectFieldAsync.propTypes = {
  options: PropTypes.array,
  loading: PropTypes.bool,
  errors: PropTypes.object,
  name: PropTypes.string,
  control: PropTypes.any,
  label: PropTypes.string,
};
