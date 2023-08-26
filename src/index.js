import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom"; 


import './index.css';

import App from './App';

// seção para as paginas (routes)
import Home from "./routes/Home.jsx"; 
import ErroPagina from './routes/ErroPagina';
import Detalhes from "./routes/Detalhes.jsx"; 

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,    
    errorElement: <ErroPagina />, 
    children: [
      {
        path: "/", 
        element: <Home />,
      }, 
      {
        path: "/home", 
        element: <Home />,
      }, 
      {
        path: "/detalhes/:id", 
        element: <Detalhes />,
      }, 
    ],
  },
]); 

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider  router = {router} />
  </React.StrictMode>,
)

/*
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
*/
