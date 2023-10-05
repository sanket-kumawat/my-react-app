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
      providesTags: ['postDetails'],
    }),

    updatePost: builder.mutation<Post, Post>({
      query: (post) => ({
        url: `/posts/${post.id}`,
        method: 'PUT',
        body: post,
      }),
      invalidatesTags: ['postDetails'],
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
  useUpdatePostMutation,
  useDeletePostMutation,
} = postApi;
