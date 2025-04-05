import React from 'react';
import ReactDOM from 'react-dom/client';
import { PrimeReactProvider } from 'primereact/api';
import { Provider } from 'react-redux';
import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { api, adminApi } from "./services";
import 'primereact/resources/themes/saga-green/theme.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import 'primereact/resources/primereact.css';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {
  RouterProvider,
} from "react-router-dom";
import router from './router/Router';
import {AdminProvider} from "./services/AdminContext";

const store = configureStore({
    reducer: {
        [adminApi.reducerPath]: adminApi.reducer,
        [api.reducerPath]: api.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(adminApi.middleware, api.middleware),
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <Provider store={store}>
          <PrimeReactProvider>
              <AdminProvider>
                  <RouterProvider router={router} />
              </AdminProvider>
          </PrimeReactProvider>
      </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
