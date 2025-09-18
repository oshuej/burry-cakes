import { createApi } from '@reduxjs/toolkit/query/react';
import { createRuntimeBaseQuery } from './baseQuery';
import {DishesRequestOptions, DishesResponse} from "./types";

const runtimeBaseQuery = createRuntimeBaseQuery((config) => config.apiBaseUrl);

export const api = createApi({
    reducerPath: 'api',
    baseQuery: runtimeBaseQuery,
    endpoints: (build) => ({
        getCatalogItems: build.query<DishesResponse, DishesRequestOptions>({
            query: ({ page, size }) => (
                {
                    url: `dish/all?page=${page}&size=${size}`
                }
            )
        })
    })
});

export const { useLazyGetCatalogItemsQuery } = api;
