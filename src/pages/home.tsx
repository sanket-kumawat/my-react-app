import { useEffect } from 'react';
import { updateHeaderTitle } from '../redux/slices/header';
import { useDispatch } from 'react-redux';

export function Home() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(updateHeaderTitle('Home'));
  }, [dispatch]);
  return <div>Home</div>;
}
