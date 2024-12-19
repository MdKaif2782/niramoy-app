import {
  BaseQueryFn,
  createApi,
  fetchBaseQuery,
  FetchArgs,
  FetchBaseQueryError
} from "@reduxjs/toolkit/query/react";
import { env } from "@/config/app.config";
import AsyncStorage from "@react-native-async-storage/async-storage";

const baseQuery = fetchBaseQuery({
  baseUrl: env.apiUrl,
  credentials: "include",
  prepareHeaders: async (headers) => {
    const niramoyUserId = await AsyncStorage.getItem("niramoy_user_id");
    if (niramoyUserId) {
      headers.set("id", niramoyUserId);
    }
    return headers;
  }
});

const baseQueryWithId: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  if (result.error && result.error.status === 401) {
    console.log("Unauthorized request");
    await AsyncStorage.removeItem("niramoy_user_id");
  }
  return result;
};

export const api = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithId,
  tagTypes: [],
  endpoints: (builder) => ({})
});