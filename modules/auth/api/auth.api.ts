import { api } from "@/api";
import {
  AuthCredentials,
  AuthResponse
} from "@/modules/auth/models/auth.model";

const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<AuthResponse, AuthCredentials>({
      query: (data: AuthCredentials) => ({
        url: "/api/user/check",
        method: "POST",
        body: data
      })
    }),

    register: builder.mutation<AuthResponse, AuthCredentials>({
      query: (data: AuthCredentials) => ({
        url: "/api/user",
        method: "POST",
        body: data
      })
    }),

    test: builder.mutation({
      query: () => ({
        url: "/api/user/check",
        method: "GET"
      })
    })
  })
});

export const { useLoginMutation, useRegisterMutation, useTestMutation } =
  authApi;
