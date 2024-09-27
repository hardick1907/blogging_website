import { useForm } from 'react-hook-form';
import {useState} from 'react';
import { Link } from 'react-router-dom';
import './Register.css';
import { useNavigate } from 'react-router-dom';

export function Register() {
  const { register, handleSubmit, formState: { errors }, getValues } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();


  const onSubmit = async (data) => {
    try {
      const response = await fetch('http://localhost:3000/register', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
      });

      if (response.ok) {
        navigate('/');
        window.location.reload();
      } else {
        // Handle server errors
        const errorData = await response.json();
        console.error('Error creating post:', errorData);
      }
    } catch {
      console.error("Error submitting form");
    }

    
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Create an Account</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="register-form">

        <div className="form-group">
          <input
            type="text"
            placeholder="First name"
            className={`form-input ${errors.firstName ? 'error' : ''}`}
            {...register("firstName", { required: "First name is required", maxLength: { value: 80, message: "Max length is 80" } })}
          />
          {errors.firstName && <p className="error-message">{errors.firstName.message}</p>}
        </div>

        <div className="form-group">
          <input
            type="text"
            placeholder="Last name"
            className={`form-input ${errors.lastName ? 'error' : ''}`}
            {...register("lastName", { required: "Last name is required", maxLength: { value: 100, message: "Max length is 100" } })}
          />
          {errors.lastName && <p className="error-message">{errors.lastName.message}</p>}
        </div>

        <div className="form-group">
          <input
            type="text"
            placeholder="Email"
            className={`form-input ${errors.email ? 'error' : ''}`}
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^\S+@\S+$/i,
                message: "Invalid email format"
              }
            })}
          />
          {errors.email && <p className="error-message">{errors.email.message}</p>}
        </div>

        <div className="form-group">
          <input
            type="text"
            placeholder="Username"
            className={`form-input ${errors.username ? 'error' : ''}`}
            {...register("username", { required: "Username is required" })}
          />
          {errors.username && <p className="error-message">{errors.username.message}</p>}
        </div>

        <div className="form-group">
          <input
            type={showPassword ? "text" : "password"} // Toggle input type
            style={{ paddingRight: "65px" }}
            placeholder="Password"
            className={`form-input ${errors.password ? 'error' : ''}`}
            {...register("password", { required: "Password is required", minLength: { value: 7, message: "Password must be at least 7 characters" } })}
          />
          <button type="button" onClick={() => setShowPassword(!showPassword)} className="toggle-password">
            {showPassword ? 'Hide' : 'Show'}
          </button>
          {errors.password && <p className="error-message">{errors.password.message}</p>}
        </div>

        <div className="form-group">
          <input
            type={showConfirmPassword ? "text" : "password"} // Toggle input type
            placeholder="Confirm Password"
            style={{ paddingRight: "65px" }}
            className={`form-input ${errors.confirmPassword ? 'error' : ''}`}
            {...register("confirmPassword", {
              required: "Please confirm your password",
              validate: (value) =>
                value === getValues("password") || "Passwords do not match"
            })}
          />
          <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="toggle-password">
            {showConfirmPassword ? 'Hide' : 'Show'}
          </button>
          {errors.confirmPassword && <p className="error-message">{errors.confirmPassword.message}</p>}
        </div>

        <button type="submit" className="submit-btn">Register</button>

        <div className="gotologin">
        <p>Already have an account?</p>
        <Link to="/login" className='login-page-link'>Login</Link> 
        </div>

      </form>
    </div>
  );
}
