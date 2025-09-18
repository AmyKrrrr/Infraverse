import React, { useState } from 'react';

const AuthForm = ({ userType, formType, onLoginSuccess }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const isRegister = formType === 'register';

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // This function will now be called immediately on button click
    onLoginSuccess({ role: userType });
  };

  return (
    <form onSubmit={handleSubmit} className="auth-form">
      {isRegister && (
        <div className="form-group">
          <label htmlFor="name">Full Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            // "required" attribute removed
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
          // "required" attribute removed
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
          // "required" attribute removed
        />
      </div>

      <button type="submit" className="btn btn-primary submit-btn">
        {isRegister ? 'Create Account' : 'Login'}
      </button>
    </form>
  );
};

export default AuthForm;