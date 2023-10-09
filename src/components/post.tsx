import { useNavigate } from 'react-router-dom';
import { useDeletePostMutation } from '../redux/services/post';
import { Post } from '../redux/slices/posts';
import { cn } from '../utils/cn';
import { Pencil, Trash2 } from 'lucide-react';

export const PostComponent: React.FC<Post> = ({ title, body, id }) => {
  const [deletePost] = useDeletePostMutation();

  const navigate = useNavigate();

  return (
    <div
      className={cn(
        'bg-gray-950 text-beige border rounded-md p-2 m-2 mb-4 h-auto w-60 flex flex-col'
      )}
    >
      <h2
        className={cn('text-2xl font-bold pb-4')}
        onClick={() => navigate(`/post/${id}`)}
      >
        {title}
      </h2>
      <p className='flex-grow'>{body}</p>

      <div className='flex justify-end gap-2 pr-2 pb-2'>
        <button
          className='text-regal-red'
          onClick={() => deletePost(id)}
        >
          <Trash2 />
        </button>
        <button
          className='text-sky-700'
          onClick={() => navigate(`/edit-post/${id}`)}
        >
          <Pencil />
        </button>
      </div>
    </div>
  );
};
