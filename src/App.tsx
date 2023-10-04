import { Link, Route, Routes } from 'react-router-dom';
import { Home } from './pages/home';
import { ToDo } from './pages/to-do';
import { Post } from './pages/post';
import { useSelector } from 'react-redux';
import { headerSelector } from './redux/slices/header';

function App() {
  const { title, show } = useSelector(headerSelector);

  return (
    <div className='min-h-screen flex flex-grow bg-blue-200'>
      <div className='w-52 bg-cyan-700'>
        <ul>
          <li>
            <Link to='/'>Home</Link>
          </li>
          <li>
            <Link to='to-do'>To Do</Link>
          </li>
          <li>
            <Link to='post'>Post</Link>
          </li>
        </ul>
      </div>
      <div className='flex flex-col flex-1 bg-cyan-400'>
        {show && <div className='h-14 bg-red-400'>{title}</div>}
        <div className='flex-grow w-full'>
          <Routes>
            <Route path='/'>
              <Route
                index
                element={<Home />}
              />
              <Route
                path='to-do'
                element={<ToDo />}
              />
              <Route
                path='post'
                element={<Post />}
              />
            </Route>
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
