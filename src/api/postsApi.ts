import { baseApi } from "./base";

const postsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPostsById: builder.query<{ id: number; name: string }, number>({
      query: (id: number) => `/posts/${id}`,
    }),
    createPost: builder.mutation({
      query: (data) => ({
        url: "/posts",
        method: "post",
        body: data,
      }),
    }),
  }),
});

export const { useCreatePostMutation, useGetPostsByIdQuery } = postsApi;

export default postsApi;
