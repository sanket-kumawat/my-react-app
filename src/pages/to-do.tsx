import { useEffect, useReducer } from 'react';
import { useDispatch } from 'react-redux';
import { updateHeaderTitle } from '../redux/slices/header';
import { ToDo, useGetToDoListQuery } from '../redux/services/todo';
import { ToDoComponent } from '../components/to-do';
import { cn } from '../utils/cn';
import { Plus } from 'lucide-react';

type InitialState = {
  tasks: ToDo[];
  inputValue: string;
};

const initialState: InitialState = {
  tasks: [],
  inputValue: '',
};

function reducer(
  state: InitialState,
  action: { type: string; payload?: string | number | ToDo[] }
): InitialState {
  const newArray = [...state.tasks];
  switch (action.type) {
    case 'setTasks': {
      return {
        ...state,
        tasks: Array.isArray(action.payload) ? [...action.payload] : [],
      };
    }

    case 'setInputValue': {
      return { ...state, inputValue: action.payload?.toString() || '' };
    }

    case 'addTask': {
      return {
        inputValue: '',
        tasks: [
          ...state.tasks,
          { title: state.inputValue, completed: false, id: 1, userId: 1 },
        ],
      };
    }

    case 'deleteTask': {
      newArray.splice(+(action?.payload || 0), 1);
      return { ...state, tasks: newArray };
    }

    case 'markDone': {
      const newArray = [...state.tasks];
      newArray[+(action.payload || 0)] = {
        title: newArray[+(action.payload || 0)].title,
        completed: true,
        id: 1,
        userId: 1,
      };
      return { ...state, tasks: newArray };
    }

    case 'markPending': {
      const newArray = [...state.tasks];
      newArray[+(action.payload || 0)] = {
        title: newArray[+(action.payload || 0)].title,
        completed: false,
        id: 1,
        userId: 1,
      };
      return { ...state, tasks: newArray };
    }

    default: {
      return state;
    }
  }
}

export function ToDoPage() {
  const { data } = useGetToDoListQuery();

  const [state, reducerDispatch] = useReducer(reducer, initialState);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(updateHeaderTitle('ToDo'));
    data && reducerDispatch({ type: 'setTasks', payload: [...data] });
  }, [dispatch, data]);

  return (
    <div className='bg-[#0D0D0D] text-beige flex flex-col items-center p-9'>
      <div
        className={cn(
          'border border-beige rounded-3xl h-44 w-96 flex gap-10 justify-center items-center'
        )}
      >
        <div>
          <h2 className={cn('text-2xl font-bold')}>Todo Done</h2>
          <p className={cn('tracking-[.2em]')}>keep it up</p>
        </div>
        <div
          className={cn(
            'w-28 h-28 rounded-full bg-regal-red flex justify-center items-center text-xl font-semibold text-black'
          )}
        >
          {state.tasks.filter((task) => task.completed).length} /{' '}
          {state.tasks.length}
        </div>
      </div>

      <div className='flex p-9 gap-2 justify-center'>
        <input
          className='bg-[#1E1E1E] placeholder-[#91826a] text-sm rounded-2xl w-80 py-3 px-5'
          value={state.inputValue}
          placeholder='Write your next task'
          onChange={(event) => {
            reducerDispatch({
              type: 'setInputValue',
              payload: event.target.value,
            });
          }}
        />
        <button
          className='rounded-full bg-regal-red text-black w-11 flex justify-center items-center'
          onClick={() => {
            reducerDispatch({ type: 'addTask' });
          }}
        >
          <Plus strokeWidth={3} />
        </button>
      </div>

      <div>
        <div className={cn('flex flex-col items-center')}>
          {state.tasks.map((task, index) => (
            <ToDoComponent
              key={index}
              title={task.title}
              completed={task.completed}
              index={index}
              reducerDispatch={reducerDispatch}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
