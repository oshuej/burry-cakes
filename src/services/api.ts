import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {DishesRequestOptions, DishesResponse} from "./types";

export const api = createApi({
    reducerPath:'api',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://www.burrycakes.ru/api/v1/mini-app' }),
    endpoints: (build) => ({
        getCatalogItems: build.query<DishesResponse, DishesRequestOptions>({
            query: ({ page, size }) => (
                {
                    url: `/dish/all?page=${page}&size=${size}`
                }
            )
        })
    })
});

export const { useLazyGetCatalogItemsQuery } = api;