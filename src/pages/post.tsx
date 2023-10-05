import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { headerSelector, updateHeaderTitle } from '../redux/slices/header';
import { fetchPosts, postSelector } from '../redux/slices/posts';
import { AppDispatch } from '../redux/store';
import { PostComponent } from '../components/post';
import {
  useGetPostDetailsQuery,
  useGetPostQuery,
} from '../redux/services/post';

export function Post() {
  const dispatch = useDispatch<AppDispatch>();

  // const { posts, isFetching, error } = useSelector(postSelector);
  const { title } = useSelector(headerSelector);

  useEffect(() => {
    title !== 'Post' && dispatch(updateHeaderTitle('Post'));
    // dispatch(fetchPosts());
  }, [dispatch]);

  const { data, isFetching, error } = useGetPostQuery();

  // const {
  //   data: postDetail,
  //   isFetching: isFetchingDetail,
  //   error: detailError,
  // } = useGetPostDetailsQuery(1);

  return (
    <div>
      <h1>Posts</h1>
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
