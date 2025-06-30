import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;
  const navigate = useNavigate();

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok) {
        localStorage.setItem("token", data.token);
        navigate("/dashboard");
      } else {
        console.error("Error:", data.msg);
      }
    } catch (err) {
      console.error("Error:", err);
    }
  };

  return (
    <div className="login-container">
      <h2>Welcome Back!</h2>
      <p className="login-description">
        Please login to your account to continue.
      </p>
      <form onSubmit={onSubmit}>
        <input
          type="email"
          name="email"
          value={email}
          onChange={onChange}
          placeholder="Email Address"
          required
        />
        <input
          type="password"
          name="password"
          value={password}
          onChange={onChange}
          placeholder="Password"
          required
        />
        <button type="submit">Login</button>
      </form>
      <p className="login-footer">
        Don't have an account? <a href="/register">Sign Up</a>
      </p>
    </div>
  );
};

export default Login;
