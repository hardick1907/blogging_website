import { useForm } from 'react-hook-form';
import { useContext, useState } from 'react';
import './Login.css';
import { Link, Navigate } from 'react-router-dom';
import { UserContext } from './UserContext';

export function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const [redirect,setRedirect] = useState(false);
  const {setUserInfo} = useContext(UserContext);
  
  const togglePasswordVisibility = () => {
    setShowPassword(prev => !prev);
  };

  async function onSubmit(data) {
    const response = await fetch('http://localhost:3000/login', {
      method: 'POST',
      body: JSON.stringify({
        username: data.Username,
        password: data.Password
      }),
      headers: {'Content-Type': 'application/json'},
      credentials: 'include', 
    });

    if(response.ok){
        response.json().then(userInfo =>{
          setUserInfo(userInfo);
          setRedirect(true);
        })
    }
    else{
      alert('Wrong Credentials')
    }
  }

  if(redirect){
    return <Navigate to={'/'}/>
  }

  return (
    <div className="form-container">
      <h2 className="form-title">Login</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="register-form">
        <div className="form-group">
          <input
            type="text"
            placeholder="Username"
            {...register("Username", { required: "Username is required" })}
            className={`form-input ${errors.Username ? 'error' : ''}`}
          />
          {errors.Username && <span className="error-message">{errors.Username.message}</span>}
        </div>

        <div className="form-group password-group">
          <input
            type={showPassword ? "text" : "password"}
            style={{ paddingRight: "65px" }}
            placeholder="Password"
            {...register("Password", { required: "Password is required" })}
            className={`form-input ${errors.Password ? 'error' : ''}`}
          />
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="show-password-btn"
          >
            {showPassword ? "Hide" : "Show"}
          </button>
          {errors.Password &&  <span className="error-message">{errors.Password.message}</span>}  
          
        </div>
        

        <button type="submit" className="submit-btn">Login</button>
        
        <div className="gotoregister">
        <p>Want to join?</p>
        <Link to="/register" className='register-page-link'>Create An Account</Link> 
        </div>

      </form>
    </div>
  );
}
