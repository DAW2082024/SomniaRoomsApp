import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Root from './routes/Root';
import ErrorPage from './error-page';
import Homepage from './routes/home-page';
import SearchPage from './routes/search-page';
import BookPage from './routes/book-page';
import SuccessPage from './routes/success-page';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Homepage />
      },
      {
        path: "/home",
        element: <Homepage />
      },
      {
        path: "/search",
        element: <SearchPage />
      },
      {
        path: "/book",
        element: <BookPage />
      },
      {
        path: "/success",
        element: <SuccessPage />
      }
    ]
  },
]);



ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
