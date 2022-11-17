import React from 'react';
import ReactDOM from 'react-dom/client';
import Links from './components/Links/Links';
import Statistic from './components/Statistic/Statistic';
import reportWebVitals from './reportWebVitals';
import { store } from './redux/store.js'
import { Provider } from 'react-redux';
import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom";


const root = ReactDOM.createRoot(document.getElementById('root'));

const router = createBrowserRouter([
  {
    path: "/",
    element: <Links />,
  },
  {
    path: "/stat",
    element: <Statistic />,
  },
]);

root.render(
  <Provider store={store}>

    <RouterProvider router={router} />
  </Provider>
);


reportWebVitals();
