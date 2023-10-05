import { useNavigate } from 'react-router-dom';
import { useDeletePostMutation } from '../redux/services/post';
import { Post } from '../redux/slices/posts';

export const PostComponent: React.FC<Post> = ({ title, body, id, userId }) => {
  const [deletePost, response] = useDeletePostMutation();

  const navigate = useNavigate();

  return (
    <div className='bg-white border rounded-md p-2 m-2 h-auto w-52 flex flex-col'>
      <h2
        className='text-2xl font-bold'
        onClick={() => navigate(`/post/${id}`)}
      >
        {title}
      </h2>
      <p className='flex-grow'>{body}</p>

      <div className='flex justify-end gap-2'>
        <button
          className='border rounded-md py-1 px-2 bg-red-600'
          onClick={() => deletePost(id)}
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
};
