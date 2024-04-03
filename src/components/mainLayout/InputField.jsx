import React from "react";
import { TextField } from "@mui/material";
import { largeInput } from "@/utils/largeInput";

const InputField = ({ param }) => {
  return (
    <>
      <TextField
        type="text"
        value={param.value}
        onChange={(event) => param.onChange(event)}
        InputProps={{
          sx: {
            color: "white",
            backgroundColor: "#434343",
            fontSize: "0.65rem",
            border: "1px solid rgb(222, 222, 222)",
            borderRadius: "5px",
            height: "1rem",
            width: "17rem",
            boxShadow: "#666666 1px 1px 1px 0px inset, #666666 -1px -1px 1px 0px inset",
            textDecoration: "none",
            padding: "0 10px",
            "&:focus": {
              border: "1px solid #434343",
            },
          },
        }}
        inputProps={{
          sx: {
            height: "20px",
            textAlign: "center",
          },
        }}
      />
      {param.handleLargeInput ? (
        largeInput !== param.value ? (
          <button className="toggleButton" onClick={param.handleLargeInput}>
            Add a Large Message
          </button>
        ) : (
          <button className="toggleButton" onClick={param.handleLargeInput}>
            Set Default Message
          </button>
        )
      ) : null}
    </>
  );
};

export default InputField;
