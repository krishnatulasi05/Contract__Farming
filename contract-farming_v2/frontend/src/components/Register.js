import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Register.css";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "farmer", // default role
  });

  const { name, email, password, role } = formData;
  const navigate = useNavigate(); // Initialize useNavigate

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok) {
        console.log("User registered:", data);
        navigate("/dashboard"); // Redirect to dashboard after successful registration
      } else {
        console.error("Error:", data.msg);
        alert(`Error: ${data.msg}`); // Show error message to user
      }
    } catch (err) {
      console.error("Error:", err);
      alert("An error occurred while registering"); // Show general error message
    }
  };

  return (
    <div className="register-container">
      <h2>Register</h2>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          name="name"
          value={name}
          onChange={onChange}
          placeholder="Name"
          required
        />
        <input
          type="email"
          name="email"
          value={email}
          onChange={onChange}
          placeholder="Email"
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
        <select name="role" value={role} onChange={onChange}>
          <option value="farmer">Farmer</option>
          <option value="buyer">Buyer</option>
        </select>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
