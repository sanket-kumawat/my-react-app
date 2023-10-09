import { Link, Route, Routes } from 'react-router-dom';
import { Home } from './pages/home';
import { ToDoPage } from './pages/to-do';
import { Post } from './pages/post';
import { useSelector } from 'react-redux';
import { headerSelector } from './redux/slices/header';
import { PostDetails } from './pages/post-details';
import { EditPost } from './pages/edit-post';
import { cn } from './utils/cn';
import { Home as HomeIcon, ListTodo, Newspaper } from 'lucide-react';

function App() {
  const { title, show } = useSelector(headerSelector);

  return (
    <div className='min-h-screen flex flex-grow'>
      <div className='w-40 bg-beige flex justify-center'>
        <ul className={cn('text-[#0D0D0D] text-xl font-bold pt-6')}>
          <li className={cn('mb-2')}>
            <Link
              className={cn('flex gap-2')}
              to='/'
            >
              <HomeIcon />
              Home
            </Link>
          </li>
          <li className={cn('mb-2')}>
            <Link
              className={cn('flex gap-2')}
              to='to-do'
            >
              <ListTodo />
              To Do
            </Link>
          </li>
          <li className={cn('mb-2')}>
            <Link
              className={cn('flex gap-2')}
              to='post'
            >
              <Newspaper />
              Post
            </Link>
          </li>
        </ul>
      </div>
      <div className='flex flex-col flex-1'>
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
