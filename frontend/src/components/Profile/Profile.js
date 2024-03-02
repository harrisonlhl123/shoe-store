import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

function Profile () {
  const currentUser = useSelector(state => state.session.user);
  return (
    <h1>Profile Page</h1>
  )
}

export default Profile;