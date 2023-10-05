import { useEffect, useReducer } from 'react';
import { useDispatch } from 'react-redux';
import { updateHeaderTitle } from '../redux/slices/header';

export type Task = {
  name: string;
  isDone: boolean;
};

type InitialState = {
  tasks: Task[];
  inputValue: string;
};

const initialState: InitialState = {
  tasks: [],
  inputValue: '',
};

function reducer(
  state: InitialState,
  action: { type: string; payload?: string | number }
): InitialState {
  const newArray = [...state.tasks];
  switch (action.type) {
    case 'setInputValue': {
      return { ...state, inputValue: action.payload?.toString() || '' };
    }

    case 'addTask': {
      return {
        inputValue: '',
        tasks: [...state.tasks, { name: state.inputValue, isDone: false }],
      };
    }

    case 'deleteTask': {
      newArray.splice(+(action?.payload || 0), 1);
      return { ...state, tasks: newArray };
    }

    case 'markDone': {
      const newArray = [...state.tasks];
      newArray[+(action.payload || 0)] = {
        name: newArray[+(action.payload || 0)].name,
        isDone: true,
      };
      return { ...state, tasks: newArray };
    }

    case 'markPending': {
      const newArray = [...state.tasks];
      newArray[+(action.payload || 0)] = {
        name: newArray[+(action.payload || 0)].name,
        isDone: false,
      };
      return { ...state, tasks: newArray };
    }

    default: {
      return state;
    }
  }
}

export function ToDo() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(updateHeaderTitle('ToDo'));
  }, [dispatch]);

  const [state, reducerDispatch] = useReducer(reducer, initialState);

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
                !task.isDone && (
                  <div key={index}>
                    {task.name}
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
                task.isDone && (
                  <div key={index}>
                    {task.name}
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
