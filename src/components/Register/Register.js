import {  useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import "../Register/Register.css";
import { useAuth } from "../../hooks/authContext";


export const Register = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const inputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const onSubmit = async (event) => {
    event.preventDefault();

    // Validaiton
    let currentError = {};

    if (formData.username.length < 3 || formData.username > 20) {
      currentError.username =
        "Username should be between 3 and 20 characters long.";
    }

    if (
      !formData.email.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
    ) {
      currentError.email = "Email must be like example@abv.bg";
    }

    if (formData.password.length < 6 || formData.password.length > 20) {
      currentError.password =
        "Password should be between 6 and 20 characters long.";
    }

    if (formData.password !== formData.confirmPassword) {
      currentError.confirmPassword = "Please password must be the same.";
    }

    if (Object.keys(currentError).length > 0) {
      setError(currentError);
      return;
    }

    // Prepare data 
        const postData = {
            name: formData.username,
            email: formData.email,
            password: formData.password,
            c_password: formData.confirmPassword
          };

    // Fetch Data
    try {
       const response = await fetch('http://127.0.0.1:8000/api/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
       })   
   
       if(response.ok){
        // const result = await response.json();
        // console.log(result.data);
        // login(result.data);

        navigate("/login");
       } else {
        currentError.email = 'This Email already exist.'
        setError(currentError)
        console.error(`Error: ${response.statusText}` );
    
       }
      
    } catch (error) {
        console.error(error);
        navigate('/register');
    }
  };

  return (

    <section className="container__register">
      <h2>Register</h2>
      <form onSubmit={onSubmit}>
        <div className="div__register__input">
          <input
            type="text"
            name="username"
            placeholder=""
            value={formData.username}
            onChange={inputChange}
            required
          />
          <label htmlFor="username">
            <i className="fa-solid fa-user"></i>Username:
          </label>
          {error.username && <p className="contactForm_p">{error.username}</p>}
        </div>

        <div className="div__register__input">
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

        <div className="div__register__input">
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

        <div className="div__register__input">
          <input
            type="password"
            name="confirmPassword"
            placeholder=""
            value={formData.confirmPassword}
            onChange={inputChange}
            required
          />
          <label htmlFor="confirmPassword">
            <i className="fa-solid fa-unlock"></i>Confirm Password:
          </label>
          {error.confirmPassword && (
            <p className="contactForm_p">{error.confirmPassword}</p>
          )}
        </div>

        <button type="submit">Register</button>
        <p className="p__dontNot">    
            If you already have account? Click <Link to="/login">here!</Link>
        </p>
      </form>
    </section>
  
  );
};
