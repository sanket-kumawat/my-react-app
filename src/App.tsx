import { Link, Route, Routes } from 'react-router-dom';
import { Home } from './pages/home';
import { ToDoPage } from './pages/to-do';
import { Post } from './pages/post';
import { useSelector } from 'react-redux';
import { headerSelector } from './redux/slices/header';
import { PostDetails } from './pages/post-details';
import { EditPost } from './pages/edit-post';

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
                element={<ToDoPage />}
              />
              <Route
                path='post'
                element={<Post />}
              />
              <Route
                path='post/:id'
                element={<PostDetails />}
              />
              <Route
                path='edit-post/:id'
                element={<EditPost />}
              />
            </Route>
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
