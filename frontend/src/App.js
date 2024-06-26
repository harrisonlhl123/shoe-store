import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Switch } from 'react-router-dom';

import { AuthRoute, ProtectedRoute } from './components/Routes/Routes';
import NavBar from './components/NavBar/NavBar';

import MainPage from './components/MainPage/MainPage';
import LoginForm from './components/SessionForms/LoginForm';
import SignupForm from './components/SessionForms/SignupForm';
import Profile from './components/Profile/Profile';
import ShowShoe from './components/Shoes/ShoeShow';
import CartShow from './components/Cart/CartShow';
import Thanks from './components/Cart/Thanks';

import { getCurrentUser } from './store/session';
import { Route } from 'react-router-dom/cjs/react-router-dom.min';
import CategoryShoes from './components/Shoes/CategoryShoes';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCurrentUser()).then(() => setLoaded(true));
  }, [dispatch]);

  return loaded && (
    <>
      <NavBar />
      <Switch>
        <Route exact path="/" component={MainPage} />
        <Route exact path="/shoes/:shoeId" component={ShowShoe}/>
        <Route exact path="/categories/:categoryId" component={CategoryShoes} />
        <AuthRoute exact path="/login" component={LoginForm} />
        <AuthRoute exact path="/signup" component={SignupForm} />

        <ProtectedRoute exact path="/profile" component={Profile} />
        <ProtectedRoute exact path="/cart" component={CartShow}/>
        <ProtectedRoute exact path="/thanks" component={Thanks} />
      </Switch>
    </>
  );
}

export default App;
