import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";

const RegisterPage = () => {
  const [data, setData] = useState({
    email: "",
    phone: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = "http://localhost:8080/api/users";
      const { data: res } = await axios.post(url, data);
      navigate("/login");
      console.log(res.message);
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
      <section className="page__register register">
        <div className="register__container container">
          <form className="register__form" action="#" onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="Email" className="form-label">
                Email address
              </label>
              <input
                type="email"
                className="form-control"
                id="Email"
                name="email"
                placeholder="Enter your email"
                aria-describedby="emailHelp"
                onChange={handleChange}
                value={data.email}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="InputTel1" className="form-label">
                Phone number
              </label>
              <input
                type="tel"
                className="form-control"
                id="InputTel1"
                name="phone"
                placeholder="Enter your phone number"
                onChange={handleChange}
                value={data.phone}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="InputPassword1" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="InputPassword1"
                name="password"
                placeholder="Create your password"
                onChange={handleChange}
                value={data.password}
                required
              />
            </div>
            <button type="submit" className="btn btn-outline-secondary">
              Register!
            </button>
            <NavLink className="nav-item nav-link" to="/login">
              Already have an account? (Log in)
            </NavLink>
          </form>
        </div>
      </section>
    </main>
  );
};

export default RegisterPage;
