import { createBrowserRouter, redirect } from "react-router-dom";
import CatalogPage from "../pages/CatalogPage/CatalogPage";
import CatalogItemPage from "../pages/CatalogItemPage/CatalogItemPage";

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
  ]);

  export default router;

