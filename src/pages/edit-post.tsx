import { useParams } from 'react-router-dom';
import {
  useGetPostDetailsQuery,
  useUpdatePostMutation,
} from '../redux/services/post';
import { useEffect, useState } from 'react';

export function EditPost() {
  const { id } = useParams<{ id: string }>();

  const numberId = parseInt(id ? id : '');

  const { data } = useGetPostDetailsQuery(numberId);

  const [formData, setFormData] = useState({
    title: '',
    body: '',
  });

  useEffect(() => {
    data &&
      setFormData({
        title: data?.title,
        body: data.body,
      });
  }, [data]);

  const [updatePost, response] = useUpdatePostMutation();

  const handleInputChange = (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = () => {
    data &&
      updatePost({
        id: data.id,
        userId: data?.userId,
        title: formData.title,
        body: formData.body,
      });

    console.log(response);
  };

  return (
    <div>
      <h2 className='text-2xl'>Edit Post</h2>
      <form className='p-4'>
        <div className='pb-4 flex flex-col'>
          <label>Title</label>
          <input
            className='border rounded-md border-black'
            name='title'
            type='text'
            value={formData.title}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className='pb-4 flex flex-col'>
          <label>Body</label>
          <textarea
            className='border rounded-md border-black'
            name='body'
            value={formData.body}
            onChange={handleInputChange}
            required
          ></textarea>
        </div>

        <div>
          <button
            className='border rounded-md py-1 px-2 bg-green-600'
            type='button'
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
