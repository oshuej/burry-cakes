import {BaseQueryArg, createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {Dish, DishesRequestOptions, DishesResponse, ExternalListResponse, SyncRequestOptions} from "./types";
export const adminApi = createApi({
    reducerPath:'adminApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://www.burrycakes.ru/api/v1/mini-app/admin/panel' }),
    endpoints: (build) => ({
        getExternalList: build.query<ExternalListResponse, void>({
            query: () => (
                {
                    url: '/external/menu/list'
                }
            )
        }),
        getSyncMenu: build.query<null, SyncRequestOptions>({
            query: ({ menuId, priceCategory }) => (
                {
                    url: `/external/menu/sync/${menuId}?priceCategory=${priceCategory}`
                }
            )
        }),
        getMenuItems: build.query<DishesResponse, DishesRequestOptions>({
            query: ({ page, size }) => (
                {
                    url: `/dish/all?page=${page}&size=${size}`
                }
            )
        }),
        getDetailedMenuItem: build.query<Dish, string>({
            query: (id) => (
                {
                    url: `/dish/${id}`
                }
            )
        }),
        updateItemInfo: build.mutation<Dish, Partial<Dish> & Pick<Dish, 'id'>>({
            query: ({ id, ...patch}) => (
                {
                    url: `/dish/${id}`,
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