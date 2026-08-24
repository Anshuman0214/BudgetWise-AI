import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { RootState } from "../../app/store";
import type { AuthResponse, Dashboard } from "./types";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL ?? "http://localhost:5000/api/v1",
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.accessToken;
      if (token) headers.set("authorization", `Bearer ${token}`);
      return headers;
    }
  }),
  tagTypes: ["Dashboard", "Budget", "Expense", "Investment", "Report"],
  endpoints: (builder) => ({
    login: builder.mutation<AuthResponse, { email: string; password: string }>({ query: (body) => ({ url: "/auth/login", method: "POST", body }) }),
    register: builder.mutation<AuthResponse, { name: string; email: string; password: string }>({ query: (body) => ({ url: "/auth/register", method: "POST", body }) }),
    getDashboard: builder.query<Dashboard, void>({ query: () => "/dashboard", providesTags: ["Dashboard"] }),
    setSalary: builder.mutation<unknown, { salary: number; salaryCreditDay: number; resetMode: string; formulaRule: string }>({ query: (body) => ({ url: "/budgets/salary", method: "POST", body }), invalidatesTags: ["Dashboard", "Budget"] }),
    createExpense: builder.mutation<unknown, { cycleId: string; category: string; amount: number; merchant?: string }>({ query: (body) => ({ url: "/expenses", method: "POST", body }), invalidatesTags: ["Dashboard", "Expense"] }),
    calculateInvestment: builder.mutation<{ projectedValue: number }, { type: string; name: string; principal: number; monthlyContribution: number; expectedAnnualReturn: number; horizonMonths: number }>({ query: (body) => ({ url: "/investments/calculate", method: "POST", body }) })
  })
});

export const { useLoginMutation, useRegisterMutation, useGetDashboardQuery, useSetSalaryMutation, useCreateExpenseMutation, useCalculateInvestmentMutation } = api;
