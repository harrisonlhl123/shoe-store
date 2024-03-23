import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import './NavBar.css';
import { logout } from '../../store/session';

function NavBar () {
  const loggedIn = useSelector(state => !!state.session.user);
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  
  const logoutUser = e => {
      e.preventDefault();
      dispatch(logout());
  }

  const getLinks = () => {
    if (loggedIn) {
      return (
        <div className="links-nav" style={{ fontFamily: 'sans-serif' }}>
          <i class="fa-solid fa-cart-shopping" style={{ marginRight: '5px' }}></i>
          {cart && cart.items.length > 0 && (
            <span className="cart-count">{cart.items.length}</span>
          )}
          <Link to={'/profile'} style={{ marginRight: '5px' }} className="links">Profile</Link>
          <button onClick={logoutUser}>Logout</button>
        </div>
      );
    } else {
      return (
        <div className="links-auth" style={{ fontFamily: 'sans-serif' }}>
          <Link to={'/signup'} style={{ marginRight: '5px' }} className="links">Signup</Link>
          <Link to={'/login'} className="links">Login</Link>
        </div>
      );
    }
  }

  return (
    <>
      <div id="nav-bar-container" style={{ fontFamily: 'sans-serif' }}>
        <Link to="/" className="links">
          <h1>GOAT</h1>
        </Link>
        { getLinks() }
      </div>
    </>
  );
}

export default NavBar;