import { createApi } from '@reduxjs/toolkit/query/react';
import {Dish, DishesRequestOptions, DishesResponse, ExternalListResponse, SyncRequestOptions} from "./types";
import { createRuntimeBaseQuery } from './baseQuery';
const adminBaseQuery = createRuntimeBaseQuery((config) => config.adminApiBaseUrl);

export const adminApi = createApi({
    reducerPath: 'adminApi',
    baseQuery: adminBaseQuery,
    endpoints: (build) => ({
        getExternalList: build.query<ExternalListResponse, void>({
            query: () => (
                {
                    url: 'external/menu/list'
                }
            )
        }),
        getSyncMenu: build.query<null, SyncRequestOptions>({
            query: ({ menuId, priceCategory }) => (
                {
                    url: `external/menu/sync/${menuId}?priceCategory=${priceCategory}`
                }
            )
        }),
        getMenuItems: build.query<DishesResponse, DishesRequestOptions>({
            query: ({ page, size }) => (
                {
                    url: `dish/all?page=${page}&size=${size}`
                }
            )
        }),
        getDetailedMenuItem: build.query<Dish, string>({
            query: (id) => (
                {
                    url: `dish/${id}`
                }
            )
        }),
        updateItemInfo: build.mutation<Dish, Partial<Dish> & Pick<Dish, 'id'>>({
            query: ({ id, ...patch}) => (
                {
                    url: `dish/${id}`,
                    method: 'put',
                    body: {
                        ...patch,
                        id
                    }
                }
            )
        })
    })
});

export const { useGetExternalListQuery, useLazyGetSyncMenuQuery, useLazyGetMenuItemsQuery, useGetDetailedMenuItemQuery, useUpdateItemInfoMutation } = adminApi;
