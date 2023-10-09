import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { headerSelector, updateHeaderTitle } from '../redux/slices/header';
import { AppDispatch } from '../redux/store';
import { PostComponent } from '../components/post';
import { useGetPostQuery } from '../redux/services/post';
import { cn } from '../utils/cn';

export function Post() {
  const dispatch = useDispatch<AppDispatch>();

  const { title } = useSelector(headerSelector);

  useEffect(() => {
    title !== 'Post' && dispatch(updateHeaderTitle('Post'));
  }, [dispatch]);

  const { data, isFetching } = useGetPostQuery();

  return (
    <div className={cn('bg-gray-600 pt-4')}>
      <div className='flex flex-wrap justify-evenly'>
        {isFetching
          ? 'Loading...'
          : data?.map((post) => (
              <PostComponent
                key={post.id}
                title={post.title}
                body={post.body}
                id={post.id}
                userId={post.userId}
              />
            ))}
      </div>
    </div>
  );
}
