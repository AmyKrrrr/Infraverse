import React, { useState } from "react";

const AuthForm = ({ userType, formType }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const isRegister = formType === "register";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(`Submitting ${userType} ${formType} form:`);
    if (isRegister) {
      console.log("Name:", formData.name);
    }
    console.log("Email:", formData.email);
    console.log("Password:", formData.password);
    // In a real app, you would make an API call here
    alert(
      `${
        userType.charAt(0).toUpperCase() + userType.slice(1)
      } ${formType} successful! (Check console for data)`
    );
  };

  return (
    <form onSubmit={handleSubmit} className="auth-form">
      {/* Only show the name field for registration */}
      {isRegister && (
        <div className="form-group">
          <label htmlFor="name">Full Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
      )}

      <div className="form-group">
        <label htmlFor="email">Email Address</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
      </div>

      <button type="submit" className="btn btn-primary submit-btn">
        {isRegister ? "Create Account" : "Login"}
      </button>
    </form>
  );
};

export default AuthForm;
