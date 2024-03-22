import React, {useContext} from 'react';
import { useNavigate } from 'react-router-dom';

import './Header.css';
import OlxLogo from '../../assets/OlxLogo';
import Search from '../../assets/Search';
import Arrow from '../../assets/Arrow';
import SellButton from '../../assets/SellButton';
import SellButtonPlus from '../../assets/SellButtonPlus';
import { AuthContext } from '../../store/FirebaseContext';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase/config';

function Header() {
 
  const {user} = useContext(AuthContext)
  const navigate =useNavigate()
  return (
    <div className="headerParentDiv">
      <div className="headerChildDiv">
        <div className="brandName">
          <OlxLogo />
        </div>
        <div className="placeSearch">
          <Search />
          <input type="text" />
          <Arrow />
        </div>
        <div className="productSearch">
          <div className="input">
            <input
              type="text"
              placeholder="Find car,mobile phone and more..."
            />
          </div>
          <div className="searchAction">
            <Search color="#ffffff"></Search>
          </div>
        </div>
        <div className="language">
          <span> ENGLISH </span>
          <Arrow />
        </div>
        <div className="loginPage" >
          <span >{user ? user.email : <span onClick={()=>navigate('/login')}>login</span>}</span>
          <hr />
          
        </div>
        {user && <span onClick={()=>{
          signOut(auth)
          navigate('/login')

        }}>Logout</span>}

        <div onClick={()=>{
              navigate('/create')
            }} className="sellMenu">
          <SellButton />
          <div className="sellMenuContent">
            <SellButtonPlus />
            <span >SELL</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;