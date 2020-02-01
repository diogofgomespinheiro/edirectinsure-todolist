//Library imports
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";

//Component imports
import FormInput from "../../components/FormInput";

//Redux
import { auth } from "../../store/modules/auth/actions";

const Login = ({ history }) => {
  const [formData, setFormData] = useState({ email: "", password: "" });

  const dispatch = useDispatch();

  const onAuth = () => dispatch(auth(formData, history, "users/login"));

  const { email, password } = formData;

  const handleChange = e => {
    const { value, name } = e.target;

    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    onAuth();
  };

  if (localStorage.getItem("token")) {
    return <Redirect to="/projects" />;
  }

  return (
    <div className="auth-container">
      <h1>Login</h1>
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
          type="password"
          name="password"
          value={password}
          handleChange={handleChange}
          label="Password"
          required
        />
        <input type="submit" className="button" value="Login" />
      </form>
    </div>
  );
};

export default Login;
