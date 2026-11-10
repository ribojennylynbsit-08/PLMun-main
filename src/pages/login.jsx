
import React, { useState } from "react";
import "../styles/Login.css";

function Login({ onLogin }) {
  const [studentNumber, setStudentNumber] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(event) {
    event.preventDefault();
    setError("");

    // Validate student number
    if (!/^\d{8}$/.test(studentNumber)) {
      setError("Please enter a valid 8-digit student number.");
      return;
    }

    // Validate password
    if (!password.trim()) {
      setError("Please enter your password.");
      return;
    }

    try {
      setLoading(true);

      // Automatically open Dashboard through App.jsx
      await onLogin(studentNumber, password);

    } catch (err) {
      setError(
        err.message || "Login failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="login-page">
      <div className="login-card">

        <div className="login-brand">
          <h1>PLMun</h1>
          <p>FINANCIAL MANAGEMENT SYSTEM</p>
        </div>

        <div className="login-header">
          <h2>Welcome Back!</h2>
          <p>
            Sign in to access your financial dashboard.
          </p>
        </div>

        <form onSubmit={handleLogin}>

          <div className="form-group">
            <label htmlFor="studentNumber">
              Student Number
            </label>

            <input
              id="studentNumber"
              type="text"
              placeholder="Enter your 8-digit student number"
              value={studentNumber}
              onChange={(event) => {
                const value = event.target.value;

                if (/^\d{0,8}$/.test(value)) {
                  setStudentNumber(value);
                  setError("");
                }
              }}
              maxLength={8}
              inputMode="numeric"
              autoComplete="username"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">
              Password
            </label>

            <div className="password-wrapper">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(event) => {
                  setPassword(event.target.value);
                  setError("");
                }}
                autoComplete="current-password"
                required
              />

              <button
                type="button"
                className="show-password"
                onClick={() =>
                  setShowPassword(!showPassword)
                }
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          {error && (
            <div className="login-error">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="login-button"
            disabled={loading}
          >
            {loading ? "Signing in..." : "SIGN IN"}
          </button>

        </form>

        <div className="login-footer">
          <p>Authorized users only</p>
          <span>
            PLMun Centralized Financial Management System
          </span>
        </div>

      </div>
    </div>
  );
}

export default Login;
