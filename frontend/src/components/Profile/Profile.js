import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

function Profile () {
  const currentUser = useSelector(state => state.session.user);
}

export default Profile;