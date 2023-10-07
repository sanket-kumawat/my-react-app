import { Trash2 } from 'lucide-react';
import { ToDo } from '../redux/services/todo';
import { cn } from '../utils/cn';
import CustomCheckbox from './custom-checkbox';

type ToDoComponent = {
  title: string;
  completed: boolean;
  reducerDispatch: (value: {
    type: string;
    payload?: string | number | ToDo[] | undefined;
  }) => void;
  index: number;
};

export const ToDoComponent: React.FC<ToDoComponent> = ({
  title,
  completed,
  reducerDispatch,
  index,
}) => {
  const toggleCheckbox = () => {
    reducerDispatch({
      type: completed ? 'markPending' : 'markDone',
      payload: index,
    });
  };

  return (
    <div
      className={cn(
        'border rounded-lg mb-5 p-5 w-96 flex gap-2 items-center h-16 bg-[#1E1E1E]'
      )}
    >
      <div className='w-7'>
        <CustomCheckbox
          isChecked={completed}
          toggleCheckbox={toggleCheckbox}
        />
      </div>
      <h2 className={cn('flex-1 overflow-clip', completed && 'line-through')}>
        {title}
      </h2>
      <button
        className={cn('w-3')}
        onClick={() => {
          reducerDispatch({ type: 'deleteTask', payload: index });
        }}
      >
        <Trash2 />
      </button>
    </div>
  );
};
