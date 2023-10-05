import { useNavigate, useParams } from 'react-router-dom';
import {
  useDeletePostMutation,
  useGetPostDetailsQuery,
} from '../redux/services/post';

export function PostDetails() {
  const { id } = useParams<{ id: string }>();

  const numberId = parseInt(id ? id : '');

  const { data } = useGetPostDetailsQuery(numberId);

  const [deletePost] = useDeletePostMutation();

  const navigate = useNavigate();

  return (
    <div>
      <h1 className='text-3xl'>{data?.title}</h1>
      <p>{data?.body}</p>

      <div>
        <button
          className='border rounded-md py-1 px-2 bg-red-600'
          onClick={() => deletePost(numberId)}
        >
          Delete
        </button>
        <button
          className='border rounded-md py-1 px-2 bg-blue-500'
          onClick={() => navigate(`/edit-post/${id}`)}
        >
          Edit
        </button>
      </div>
    </div>
  );
}
