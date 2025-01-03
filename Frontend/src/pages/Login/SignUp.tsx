import React, { useState } from 'react';
import { LogIn, Eye, EyeOff, Mail, Lock, UserPlus } from "lucide-react";
import './Login.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Signup: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowPConfirmpassword] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate(); 

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    if (password !== confirmPassword) {
      setError("Passwords doesn't match.");
      return;
    }

    try {
      const res = await axios.post('http://localhost:3000/api/signup', {
        username,
        email,
        password,
      });

      if (res.data.signup) {
        navigate('/login'); 
        alert(res.data.message)
      }      
      
    } catch (error: any) {
      if (error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError("Error creating account. Please try again.");
      }
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <UserPlus className="w-16 h-16 mx-auto text-white" data-testid="title-icon" />
          <h2 className="login-title">Create Account</h2>
          <p className="login-subtitle">Sign up for a new account</p>
        </div>
        <form onSubmit={handleSignup} data-testid="form-test">
          <div className="input-group">
            <Mail className="input-icon" data-testid="username-icon"  />
            <input
              type="text"
              className="input-field"
              placeholder="Enter the Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <Mail className="input-icon"  data-testid="mail-icon" />
            <input
              type="email"
              className="input-field"
              placeholder="Enter the Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <Lock className="input-icon" data-testid="password-icon" />
            <input
              type={showPassword ? "text" : "password"}
              className="input-field"
              placeholder="Enter the Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
             <button
              type="button"
              className="password-toggle"
              data-testid="password-toggle-icon"
              onClick={() => setShowPassword(!showPassword)}
              tabIndex={-1} 
              aria-label={showPassword ? "Hide password" : "Show password"} 
            >
              {showPassword ? <EyeOff /> : <Eye />}
            </button>
          </div>
          <div className="input-group">
            <Lock className="input-icon" data-testid="con-password-icon"/>
            <input
              type={showConfirmPassword ? "text" : "password"}
              className="input-field"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
             <button
              type="button"
              className="password-toggle"
              data-testid="con-toggle-icon"
              onClick={() => setShowPConfirmpassword(!showConfirmPassword)}
              tabIndex={-1} 
              aria-label={showConfirmPassword ? "Hide password" : "Show password"} 
            >
              {showConfirmPassword ? <EyeOff /> : <Eye />}
            </button>
          </div>
          {error && <p className="error-message">{error}</p>}
          <button type="submit" className="submit-button"  data-testid="signup-btn">
            <LogIn data-testid="Signup-icon"/>Sign up</button>
          <p style={{ color: "white", textDecoration: "none", fontWeight: "lighter", fontSize: "13px" }} >
            You have an Account ? <a style={{fontSize:"14px",fontWeight:"bold", color:"DodgerBlue", textDecoration: "underline DodgerBlue" }} href="/login"> Click here</a> to LogIn
          </p>
        </form>
        <div className="divider">
          <span className="divider-text">Or continue with</span>
        </div>
        <div className="social-buttons">
          <button className="social-button" data-testid="google-btn">
            Google Account
          </button>
        </div>
      </div>
      {/* <img src={LoginImage} alt="Signup" className="right-image" /> */}
    </div>
  );
};

export default Signup;
