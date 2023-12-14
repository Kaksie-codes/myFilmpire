import { useState } from 'react'
import './signin.css'
import { Link } from 'react-router-dom'
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import Logo from '../../components/logo/Logo'
import { useNavigate } from 'react-router-dom';

const SignInPage = () => {
  const [formData, setformData] = useState({ email:"", password:"" });
  const [type, setType] = useState('password');
  const navigate = useNavigate(); 

  const handleChange = (e:any) => {
    const {name, value} = e.target;
    // alert('yayy')
    setformData(prevState => (
      {...prevState, [name]: value}
    ))
  }

  const handleIconVisibility = (name: string) => {
    if (name === 'password') {
          setType((prevType) => (prevType === 'password' ? 'text' : 'password'));
      }
  }
  
  return (
    <div className="signup-page">
      <nav>
        <div className="nav__container container">
          <Logo/>                  
          <Link to="/signup">
            <button className="btn btn-rounded">Sign Up</button>
          </Link>            
        </div> 
      </nav>
      <div className="signup-modal">
        <h3>Sign In</h3>
        <form>
        <div className="password_input">
          <input 
            type="email" 
            autoComplete="email" 
            maxLength={50} 
            minLength={5} 
            name="email" 
            onChange={handleChange} 
            value={formData.email}
            className={formData.email !== "" ? "has-value" : ""}
          />
          <span className={formData.email.length > 0 ? "has-value" : ""}>Email address</span>
        </div>
        <div className="password_input">
          <input 
            type={type}
            autoComplete="password" 
            maxLength={50}
            minLength={5} 
            name="password" 
            onChange={handleChange} 
            value={formData.password}
            className={formData.password.length > 0 ? "has-value" : ""}
          />
          {type === 'password' ? (
            <VisibilityIcon className="icon" 
              onClick={() => handleIconVisibility('password')} 
            />
              ) : (
            <VisibilityOffIcon className="icon" 
              onClick={() => handleIconVisibility('password')} 
            />
          )}
          <span className={formData.password.length > 0 ? "has-value" : ""}>Password</span>
        </div>
        <button type="submit" 
          className="button" 
          // onClick={signInUser}
          >Sign In</button>
        </form>
        <p>New to Netflix? <b onClick={() => navigate("/signup")}>Sign Up Now</b></p>
      </div>
    </div>
  )
}

export default SignInPage