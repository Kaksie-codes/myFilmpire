import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import Logo from '../../components/logo/Logo'
import { useNavigate } from 'react-router-dom';
import movie1 from '../../assets/movie1.jpg'
import movie2 from '../../assets/movie2.jpg'
import movie3 from '../../assets/movie3.webp'
import movie4 from '../../assets/movie4.jpg'
import movie5 from '../../assets/movie5.jpg'
import movie6 from '../../assets/movie6.webp'
import movie7 from '../../assets/movie7.jpg'
import './signin.css'

const SignInPage = () => {
  const [formData, setformData] = useState({ email:"", password:"" });
  const [type, setType] = useState('password');
  const navigate = useNavigate(); 
  const movies:string[] = [movie1, movie2, movie3, movie4, movie5, movie6, movie7];
  const [imageIndex, setImageIndex] = useState(0);
  let backgroundImage = `url(${movies[imageIndex]})`

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

  useEffect(() => {
    const intervalId = setInterval(() => {
      setImageIndex((prevIndex) => (prevIndex + 1) % movies.length);
    }, 4000);

    // Clear the interval when the component is unmounted
    return () => clearInterval(intervalId);
  }, [imageIndex]);

  
  return (
    <div className="signup-page" style={{backgroundImage:backgroundImage}}>
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