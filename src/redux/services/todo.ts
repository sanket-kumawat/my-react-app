import { baseApi } from '.';

export type ToDo = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
};

export const todoApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getToDoList: builder.query<ToDo[], void>({
      query: () => `todos`,
    }),
  }),
});

export const { useGetToDoListQuery } = todoApi;
