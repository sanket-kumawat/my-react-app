import { useEffect, useReducer } from 'react';
import { useDispatch } from 'react-redux';
import { updateHeaderTitle } from '../redux/slices/header';
import { ToDo, useGetToDoListQuery } from '../redux/services/todo';

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
  const { data, isFetching } = useGetToDoListQuery();

  const [state, reducerDispatch] = useReducer(reducer, initialState);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(updateHeaderTitle('ToDo'));
    data && reducerDispatch({ type: 'setTasks', payload: [...data] });
  }, [dispatch, data]);

  return (
    <div>
      <div>
        <input
          value={state.inputValue}
          onChange={(event) => {
            reducerDispatch({
              type: 'setInputValue',
              payload: event.target.value,
            });
          }}
        />
        <button
          className='border rounded-md py-1 px-2 bg-white'
          onClick={() => {
            reducerDispatch({ type: 'addTask' });
          }}
        >
          Add Task
        </button>
      </div>

      <div>
        <h3 className='text-xl'>Pending Task</h3>
        <div className='pb-3'>
          {state.tasks &&
            state.tasks.map(
              (task, index) =>
                !task.completed && (
                  <div key={index}>
                    {task.title}
                    <button
                      className='border rounded-md py-1 px-2 bg-white'
                      onClick={() => {
                        reducerDispatch({ type: 'markDone', payload: index });
                      }}
                    >
                      Done
                    </button>
                    <button
                      className='border rounded-md py-1 px-2 bg-red-500'
                      onClick={() => {
                        reducerDispatch({ type: 'deleteTask', payload: index });
                      }}
                    >
                      Delete
                    </button>
                  </div>
                )
            )}
        </div>

        <h3 className='text-xl'>Completed Task</h3>
        <div>
          {state.tasks &&
            state.tasks.map(
              (task, index) =>
                task.completed && (
                  <div key={index}>
                    {task.title}
                    <button
                      className='border rounded-md py-1 px-2 bg-white'
                      onClick={() => {
                        reducerDispatch({
                          type: 'markPending',
                          payload: index,
                        });
                      }}
                    >
                      Pending
                    </button>
                    <button
                      className='border rounded-md py-1 px-2 bg-red-500'
                      onClick={() => {
                        reducerDispatch({ type: 'deleteTask', payload: index });
                      }}
                    >
                      Delete
                    </button>
                  </div>
                )
            )}
        </div>
      </div>
    </div>
  );
}
