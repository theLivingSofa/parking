import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import PrivateRoute from './components/PrivateRoute';


createRoot(document.getElementById('root')).render(
  <StrictMode>
      <PrivateRoute>
        <App />
      </PrivateRoute>
  </StrictMode>
);


// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <App />
//   </StrictMode>,
// )
