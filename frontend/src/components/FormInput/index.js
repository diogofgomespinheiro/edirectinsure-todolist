//Library Imports
import React from "react";

//Style Imports
import "./styles.scss";

const FormInput = ({ handleChange, label, ...otherProps }) => {
  return (
    <div className="form-group">
      <label>{label}</label>
      <input className="form-input" onChange={handleChange} {...otherProps} />
    </div>
  );
};

export default FormInput;
