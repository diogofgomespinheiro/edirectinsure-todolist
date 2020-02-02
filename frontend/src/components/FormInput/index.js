//Library Imports
import React from "react";

//Style Imports
import "./styles.scss";

const FormInput = ({ handleChange, label, ...otherProps }) => {
  return (
    <div className="form-group">
      <input
        className="form-input"
        onChange={handleChange}
        {...otherProps}
        placeholder={label}
      />
    </div>
  );
};

export default FormInput;
