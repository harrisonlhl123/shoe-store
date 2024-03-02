import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import './NavBar.css';
import { logout } from '../../store/session';

function NavBar () {
  const loggedIn = useSelector(state => !!state.session.user);
  const dispatch = useDispatch();
  
  const logoutUser = e => {
      e.preventDefault();
      dispatch(logout());
  }

  const getLinks = () => {
    if (loggedIn) {
      return (
        <div className="links-nav">
          <i class="fa-solid fa-cart-shopping" style={{ marginRight: '5px' }}></i>
          <Link to={'/profile'} style={{ marginRight: '5px' }}>Profile</Link>
          <button onClick={logoutUser}>Logout</button>
        </div>
      );
    } else {
      return (
        <div className="links-auth">
          <Link to={'/signup'} style={{ marginRight: '5px' }}>Signup</Link>
          <Link to={'/login'}>Login</Link>
        </div>
      );
    }
  }

  return (
    <>
      <div id="nav-bar-container">
        <h1>GOAT</h1>
        { getLinks() }
      </div>
    </>
  );
}

export default NavBar;