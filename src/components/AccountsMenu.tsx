// import React from 'react'
import Avatar from '../assets/Netflix-avatar.png'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router';

interface StoreProps {
    userName: string | null;
}

// Define the Redux state interface
interface RootState {
    user: StoreProps;
}
const AccountsMenu = () => {
    const { userName } = useSelector((state: RootState) => state.user);
    const navigate = useNavigate();

  return (
    <div className="account__menu">
        <div className="account__menu-top">
            <div className="avatar">
                <img src={Avatar} alt="" />
            </div>
            <p>{userName}</p>
        </div>        
        <p onClick={() => navigate('/profile')}>sign out of netflix</p>
    </div>
  )
}

export default AccountsMenu