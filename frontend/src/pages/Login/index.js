//Library imports
import React, { useState } from "react";

//Component imports
import FormInput from "../../components/FormInput";

const Login = ({ history }) => {
  const [formData, setFormData] = useState({ email: "", password: "" });

  const { email, password } = formData;

  const handleChange = e => {
    const { value, name } = e.target;

    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    history.push("/projects");
  };

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
