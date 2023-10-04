import { Post } from '../redux/slices/posts';

export const PostComponent: React.FC<Post> = ({ title, body, id, userId }) => {
  return (
    <div className='bg-white border rounded-md p-2 m-2 h-auto w-52 flex flex-col'>
      <h2 className='text-2xl font-bold'>{title}</h2>
      <p className='flex-grow'>{body}</p>

      <div className='mt-auto flex justify-end gap-2'>
        <button className='border rounded-md py-1 px-2 bg-red-600'>
          Delete
        </button>
        <button className='border rounded-md py-1 px-2 bg-blue-500'>
          Edit
        </button>
      </div>
    </div>
  );
};
