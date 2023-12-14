import { Link } from 'react-router-dom'
import logo from '../../assets/filmpire.png'
import './logo.css'

const Logo = () => {
  return (
    <div className='logo'>
        <Link to='/'>
          <img src={logo} alt="logo" />
        </Link>
    </div>
  )
}

export default Logo