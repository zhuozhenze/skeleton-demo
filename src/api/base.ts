import {
  BaseQueryFn,
  createApi,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
  FetchBaseQueryMeta,
} from "@reduxjs/toolkit/query/react";
import { QueryReturnValue } from "@reduxjs/toolkit/dist/query/baseQueryTypes";
import { Mutex } from "async-mutex";

const BASE_URL = "https://a83f67ac-6c16-4bdb-8547-30a3aa14f10e.mock.pstmn.io";

const mutex = new Mutex();
const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  prepareHeaders: (headers) => {
    //TODO: 添加token
    return headers;
  },
});

//拦截器
const baseQeuryWithIntercept: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result: QueryReturnValue<any, FetchBaseQueryError, FetchBaseQueryMeta> =
    await baseQuery(args, api, extraOptions);
  await mutex.waitForUnlock();
  const { error } = result;
  if (error) {
    const { status } = error as FetchBaseQueryError;
    //处理401错误
    if (status === 401) {
      if (!mutex.isLocked()) {
        const release = await mutex.acquire();
        try {
          // const refreshResult = await baseQuery(
          //   "/refreshToken",
          //   api,
          //   extraOptions
          // );
          // if (refreshResult.data) {
          //   api.dispatch(tokenReceived(refreshResult.data));
          //   // retry the initial query
          //   result = await baseQuery(args, api, extraOptions);
          // } else {
          //   api.dispatch(loggedOut());
          // }
        } finally {
          release();
        }
      } else {
        await mutex.waitForUnlock();
        // result = await baseQuery(args, api, extraOptions)
      }
    }
  }

  return result;
};

export const baseApi = createApi({
  baseQuery: baseQeuryWithIntercept,
  reducerPath: "baseApi",
  // 缓存，默认时间是秒，默认时长60秒
  keepUnusedDataFor: 5 * 60,
  refetchOnMountOrArgChange: 30 * 60,
  endpoints: () => ({}),
});
