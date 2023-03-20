import React from "react";
import styled from "styled-components";
import TextField from "@mui/material/TextField";

const CustomInputText = styled(TextField)({
  "& label.Mui-focused": {
    color: "#7BAB6E",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "#7BAB6E",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#7BAB6E",
    },
    "&:hover fieldset": {
      borderColor: "#7BAB6E",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#7BAB6E",
    },
  },
});

const InputText = ({ label, type, id }) => {
  return (
    <CustomInputText
      id={ id ? id : "outlined-basic"}
      label={label}
      InputProps={{
        style: { borderRadius: '16px', color: "#7BAB6E" },
      }}
      InputLabelProps={{
        style: { color: "#7BAB6E" },
      }}
      type={type}
      variant="outlined"
    />
  );
};

export default InputText;
