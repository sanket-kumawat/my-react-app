import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { headerSelector, updateHeaderTitle } from '../redux/slices/header';
import { fetchPosts, postSelector } from '../redux/slices/posts';
import { AppDispatch } from '../redux/store';
import { PostComponent } from '../components/post';

export function Post() {
  const dispatch = useDispatch<AppDispatch>();

  const { posts, isFetching, error } = useSelector(postSelector);
  const { title } = useSelector(headerSelector);

  useEffect(() => {
    title !== 'Post' && dispatch(updateHeaderTitle('Post'));
    dispatch(fetchPosts());
  }, [dispatch]);

  return (
    <div>
      <h1>Posts</h1>
      <div className='flex flex-wrap justify-evenly'>
        {isFetching
          ? 'Loading...'
          : posts.map((post) => (
              <PostComponent
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
