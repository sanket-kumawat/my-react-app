import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { updateHeaderTitle } from '../redux/slices/header';

export function ToDo() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(updateHeaderTitle('ToDo'));
  }, [dispatch]);

  return <div>ToDo</div>;
}
