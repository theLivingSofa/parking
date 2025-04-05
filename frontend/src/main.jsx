import React from "react";
import { StrictMode } from 'react';
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import PrivateRoute from "./components/PrivateRoute";
import { createRoot } from 'react-dom/client'
import './index.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <PrivateRoute>
        <App />
      </PrivateRoute>
    </BrowserRouter>
  </StrictMode>
);


// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <App />
//   </StrictMode>,
// )
