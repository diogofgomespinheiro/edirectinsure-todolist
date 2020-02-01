//Library imports
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";

//Component imports
import FormInput from "../../components/FormInput";

//Redux
import { auth } from "../../store/modules/auth/actions";
import { setAlert } from "../../store/modules/alert/actions";

const Register = ({ history }) => {
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    password: "",
    confirmPassword: ""
  });

  const dispatch = useDispatch();

  const onAuth = () => dispatch(auth(formData, history, "users/register"));
  const onSetAlert = (msg, type) => dispatch(setAlert(msg, type));

  const { email, name, password, confirmPassword } = formData;

  const handleChange = e => {
    const { value, name } = e.target;

    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (password === confirmPassword) {
      onAuth();
    } else {
      onSetAlert("The password´s dont match", "danger");
    }
  };

  if (localStorage.getItem("token")) {
    return <Redirect to="/projects" />;
  }

  return (
    <div className="auth-container">
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <FormInput
          type="email"
          name="email"
          value={email}
          handleChange={handleChange}
          label="Email"
          required
        />
        <FormInput
          type="text"
          name="name"
          value={name}
          handleChange={handleChange}
          label="Name"
          required
        />
        <FormInput
          type="password"
          name="password"
          value={password}
          handleChange={handleChange}
          label="Password"
          required
        />
        <FormInput
          type="password"
          name="confirmPassword"
          value={confirmPassword}
          handleChange={handleChange}
          label="Confirm Password"
          required
        />
        <input type="submit" className="button" value="Register" />
      </form>
    </div>
  );
};

export default Register;
