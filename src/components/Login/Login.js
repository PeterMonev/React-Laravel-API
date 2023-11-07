import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../Login/Login.css";
import { useAuth } from "../../hooks/authContext";

export const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState({
    email: "",
    password: "",
  });

  const inputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const onSubmit = async (event) => {
    event.preventDefault();

    // Validation
    let currentError = {};

    if (!formData.email.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)) {
      currentError.email = "Email must be like example@abv.bg";
    }

    if (formData.password.length < 6 || formData.password.length > 20) {
      currentError.password =
        "Password should be between 6 and 20 characters long.";
    }

    if (Object.keys(currentError).length > 0) {
      setError(currentError);
      return;
    }

    // Prepare data
    const postData = {
      email: formData.email,
      password: formData.password,
    };

    // Fetch Data
    try {
      const response = await fetch("http://127.0.0.1:8000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      });

      if (response.ok) {
        const result = await response.json();
       
        login(result.data);

        navigate("/dashboard");
      } else {
        currentError.email = "Invalid email or password.";
        setError(currentError);
        console.error(`Error: ${response.statusText}`);
      }
    } catch (error) {
      console.error(error);
      navigate("/login");
    }
  };

  return (
    <section className="container__login">
      <h2>Login</h2>
      <form onSubmit={onSubmit}>
        <div className="div__login__input">
          <input
            type="email"
            name="email"
            placeholder=""
            value={formData.email}
            onChange={inputChange}
            required
          />
          <label htmlFor="email">
            <i className="fa-solid fa-envelope"></i>Email:
          </label>
          {error.email && <p className="contactForm_p">{error.email}</p>}
        </div>

        <div className="div__login__input">
          <input
            type="password"
            name="password"
            placeholder=""
            value={formData.password}
            onChange={inputChange}
            required
          />
          <label htmlFor="password">
            <i className="fa-solid fa-lock"></i>Password:
          </label>
          {error.password && <p className="contactForm_p">{error.password}</p>}
        </div>

        <button type="submit">Login</button>
        <p className="p__dontNot">
          Don't have an account? Click <Link to="/register">here!</Link>
        </p>
      </form>
    </section>
  );
};
