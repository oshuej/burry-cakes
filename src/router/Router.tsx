import React from 'react';
import { createBrowserRouter, redirect } from "react-router-dom";
import { getRuntimeConfig } from "../config/runtimeConfig";
import CatalogPage from "../pages/UserPanel/CatalogPage/CatalogPage.jsx";
import CatalogItemPage from "../pages/UserPanel/CatalogItemPage/CatalogItemPage.jsx";
import OrdersPage from "../pages/UserPanel/OrdersPage/OrdersPage";
import BonusesPage from "../pages/UserPanel/BonusesPage/BonusesPage";
import OrdersItemPage from "../pages/UserPanel/OrderItemPage/OrderItemPage";
import ProfilePage from "../pages/UserPanel/ProfilePage/ProfilePage";
import MenuPage from "../pages/AdminPanel/MenuPage/MenuPage.jsx";
import MenuDetailedPage from "../pages/AdminPanel/MenuDetailedPage/MenuDetailedPage";

const { appBaseUrl } = getRuntimeConfig();

const router = createBrowserRouter([
    {
        path: '/',
        loader: () => { return redirect('/catalog') },
        element: <div></div>
    },
    {
        path: '/catalog/:itemID',
        element: <CatalogItemPage />
    },
    {
      path: "/catalog",
      element: <CatalogPage />,
    },
    {
      path: '/orders',
      element: <OrdersPage />
    },
    {
      path: '/bonuses',
      element: <BonusesPage />
    },
    {
      path: '/orders/:orderID',
      element: <OrdersItemPage />
    },
    {
      path: '/profile',
      element: <ProfilePage />
    },
    {
      path: '/admin/specials',
      element: <ProfilePage />
    },
    {
      path: '/admin/catalog',
      element: <MenuPage />
    },
    {
      path: '/admin/catalog/edit/:id',
      element: <MenuDetailedPage />
    }
], { basename: appBaseUrl });

export default router;

