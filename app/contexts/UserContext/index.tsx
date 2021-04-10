import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { useAppState } from '#contexts/AppContext';
import { useStateSelector } from '#hooks/useReduxStateSelector';
import { getPlaces } from '#redux/actions/Place';
import { getUser } from '#redux/actions/Authorization';
import LoadingView from '#components/LoadingView';

const UserProvider = ({ children }: { children: JSX.Element }) => {
  const dispatch = useDispatch();
  const { user, setUser, isLoggedIn, isLoading } = useAppState();
  const { authorizationLoading } = useStateSelector((state) => state.auth);
  const { placeLoading } = useStateSelector((state) => state.place);

  useEffect(() => {
    if (isLoggedIn) dispatch(getUser(setUser));
  }, [isLoggedIn, dispatch, setUser]);

  useEffect(() => {
    if (isLoggedIn && user) dispatch(getPlaces());
  }, [isLoggedIn, dispatch, user]);

  if (isLoading || authorizationLoading || placeLoading) return <LoadingView />;

  return children;
};

export default UserProvider;
