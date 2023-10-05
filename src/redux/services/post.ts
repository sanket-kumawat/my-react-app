import { baseApi } from '.';
import { Post } from '../slices/posts';

export const postApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPost: builder.query<Post[], void>({
      query: () => `posts`,
      providesTags: ['posts'],
    }),

    getPostDetails: builder.query<Post, number>({
      query: (id) => `posts/${id}`,
    }),

    deletePost: builder.mutation<void, number>({
      query: (id) => ({
        url: `posts/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['posts'],
    }),
  }),
});

export const {
  useGetPostQuery,
  useGetPostDetailsQuery,
  useDeletePostMutation,
} = postApi;
