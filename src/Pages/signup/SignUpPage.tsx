import { useState, useRef, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../../firebase';
import Logo from '../../components/logo/Logo';
import movie1 from '../../assets/movie1.jpg'
import movie2 from '../../assets/movie2.jpg'
import movie3 from '../../assets/movie3.webp'
import movie4 from '../../assets/movie4.jpg'
import movie5 from '../../assets/movie5.jpg'
import movie6 from '../../assets/movie6.webp'
import movie7 from '../../assets/movie7.jpg'
import './signup.css'

const SignUpPage = () => {
  const [formData, setformData] = useState({email:"", password:"", passwordCheck:""}); 
  const [type, setType] = useState('password');
  const [confirmType, setConfirmType] = useState('password');
  const [strengthLabel, setStrengthLabel] = useState('');
  const [strengthWidth, setStrengthWidth] = useState('50%');
  const [background, setBackground] = useState('red');
  const [textColor, setTextColor] = useState('');
  const navigate = useNavigate();   
  const dispatch = useDispatch();
  const movies:string[] = [movie1, movie2, movie3, movie4, movie5, movie6, movie7];
  const [imageIndex, setImageIndex] = useState(0);
  let backgroundImage = `url(${movies[imageIndex]})`

  useEffect(() => {
    calculatePasswordStrength(formData.password)
  }, [formData.password])

  useEffect(() => {
    const intervalId = setInterval(() => {
      setImageIndex((prevIndex) => (prevIndex + 1) % movies.length);
    }, 4000);

    // Clear the interval when the component is unmounted
    return () => clearInterval(intervalId);
  }, [imageIndex]);

  //Function for updating state of the form
  const handleChange = (e:any) => {
    const {name, value} = e.target;
    setformData(prevData => {
      return {
        ...prevData,
        [name]: value
      }      
    }) 
  }

  //Function for Hiding/Revealing Password
  const hideShow = (name: string) => {
    if (name === 'password') {
      setType((prevType) => (prevType === 'password' ? 'text' : 'password'));
    } else if (name === 'passwordCheck') {
      setConfirmType((prevConfirmType) =>
        prevConfirmType === 'password' ? 'text' : 'password'
      );
    }
  };

  //Function for signing up user with google firebase authentication
  const signUpUser = (e: any) => {
    if(formData.password !== formData.passwordCheck){
      alert('Passwords do not match');
    }else{
      e.preventDefault();
      // dispatch(setUserName(formData.username))
      createUserWithEmailAndPassword(auth, formData.email, formData.password)
        .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        navigate("/movies");        
        // ...
        })
        .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorMessage);
        console.log('error code ',errorCode);
        
      // ..
      });
    }   
  }

  //This function uses RegEx to calculate password strength
  function calculatePasswordStrength(password: string) {
    const lengthScore = password.length >= 6 ? 10 : 0;
    const lowercaseRegex = /[a-z]/g;
    const uppercaseRegex = /[A-Z]/g;
    const numericRegex = /[0-9]/g;
    const specialRegex = /[^a-zA-Z0-9\s]/g;
    const characterScores = {
      lowercase: password.match(lowercaseRegex) ? 20 : 0,
      uppercase: password.match(uppercaseRegex) ? 20 : 0,
      numeric: password.match(numericRegex) ? 20 : 0,
      special: password.match(specialRegex) ? 20 : 0,
    };
    const repeatedCharsRegex = /(.)\1/g;
    const repeatedCharsScore = password.match(repeatedCharsRegex) ? -10 : 0;
  
    const strength = lengthScore +
      characterScores.lowercase +
      characterScores.uppercase +
      characterScores.numeric +
      characterScores.special +
      repeatedCharsScore;
  
    const mappedStrength = Math.max(Math.floor((strength / 90) * 100), 0);   
    getStrengthLabel(mappedStrength);       
    setStrengthWidth(`${mappedStrength}%`);  
    return mappedStrength;
  }

  //this function updates the strength indicator as appropriate.
  const getStrengthLabel = (mappedStrength: number) => {
    if (mappedStrength <= 25) {
        setTextColor('#ff0000');
        setBackground('#ff0000');
        setStrengthLabel('Too Weak');       
    } else if (mappedStrength <= 50) {
        setTextColor('#ff4757');
        setBackground('#ff4757');
        setStrengthLabel('Weak');      
    } else if (mappedStrength <= 75) {
        setTextColor('#ffa500');
        setBackground('#ffa500');
        setStrengthLabel('Strong');      
    } else {
        setTextColor('#008000');
        setBackground('#008000');
        setStrengthLabel('Very Strong');      
    }
  };

  return (
    <div className="signup" style={{backgroundImage:backgroundImage}}>
    <nav>
      <div className="nav__container container">        
        <Logo/>                 
        <Link to='/signin'>
          <button className="btn btn-rounded">Sign In</button>
        </Link>            
      </div> 
    </nav>
    <div className="signup-modal">
      <h3>Sign Up</h3>
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
            maxLength={30}
            minLength={5} 
            name="password" 
            onChange={handleChange} value={formData.password}
            className={formData.password.length > 0 ? "has-value" : ""}
          />
          {type === 'password' ? (
            <VisibilityIcon className="icon" onClick={() => hideShow('password')} />
              ) : (
            <VisibilityOffIcon className="icon" onClick={() => hideShow('password')} />
          )}
          <span className={formData.password.length > 0 ? "has-value" : ""}>Password</span>
        </div>
        {formData.password && 
          <div className="password__strength-indicator">
            <div className='strength-bar' style={{ width: strengthWidth, background: background, minHeight: '5px' }}></div>
          </div>
        }
        {formData.password && <div className="indicator-text"  style={{color: textColor}}>{formData.password ? strengthLabel : ''}</div>}
        <div className="password_input special">
          <input 
            type={confirmType}
            autoComplete="password"
            maxLength={30} minLength={5} name="passwordCheck" 
            onChange={handleChange}
            value={formData.passwordCheck}
            className={formData.passwordCheck.length > 0 ? "has-value" : ""}
          />
          {confirmType === 'password' ? (
            <VisibilityIcon className="icon" onClick={() => hideShow('passwordCheck')} />
              ) : (
            <VisibilityOffIcon className="icon" onClick={() => hideShow('passwordCheck')} />
          )}
          <span className={formData.passwordCheck.length > 0 ? "has-value" : ""}>Confirm Password</span>
        </div>               
        <button type="submit" className="button" 
          onClick={signUpUser}
        >Sign Up</button>
      </form>
      <p>Already have an account? <b onClick={() => navigate("/signin")}>Sign In Now</b></p>
    </div> 
  </div>
  )
}

export default SignUpPage