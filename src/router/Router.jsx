import { createBrowserRouter, redirect } from "react-router-dom";
import CatalogPage from "../pages/CatalogPage/CatalogPage";
import CatalogItemPage from "../pages/CatalogItemPage/CatalogItemPage";
import OrdersPage from "../pages/OrdersPage/OrdersPage";
import BonusesPage from "../pages/BonusesPage/BonusesPage";

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
    }
  ]);

  export default router;

