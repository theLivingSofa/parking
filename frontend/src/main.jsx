import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import PrivateRoute from './components/PrivateRoute';
import { BrowserRouter } from 'react-router-dom';


// createRoot(document.getElementById('root')).render(
  
//   <StrictMode>
//     <BrowserRouter>
//       <PrivateRoute>
//         <App />
//       </PrivateRoute>
//       </BrowserRouter>
//   </StrictMode>
// );


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
