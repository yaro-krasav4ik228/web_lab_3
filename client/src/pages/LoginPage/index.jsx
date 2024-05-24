import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";

const LoginPage = () => {
  const [data, setData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = "http://localhost:8080/api/auth";
      const { data: res } = await axios.post(url, data);
      localStorage.setItem("token", res.data);
      window.location = "/profile";
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.message);
      }
    }
  };

  return (
    <main className="page">
      <div className="page__login login">
        <div className="login__container container">
          <form className="main-login__form" action="#" onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="InputLogin" className="form-label">
                Enter your email:
              </label>
              <input
                className="form-control"
                type="text"
                id="InputLogin"
                name="email"
                placeholder="Enter your email"
                onChange={handleChange}
                value={data.email}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="InputPassword1" className="form-label">
                Enter your password:
              </label>
              <input
                type="password"
                className="form-control"
                id="InputPassword1"
                name="password"
                placeholder="Enter your password"
                onChange={handleChange}
                value={data.password}
                required
              />
            </div>
            <button type="submit" className="btn btn-outline-secondary">
              Log in!
            </button>
            <div style={{ color: "red", margin: "20px 0" }}>{error}</div>
            <NavLink className="nav-item nav-link" to="/registration">
              Don't have an account yet? (Registration)
            </NavLink>
          </form>
        </div>
      </div>
    </main>
  );
};

export default LoginPage;
