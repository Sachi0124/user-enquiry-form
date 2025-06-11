import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx' // <--- Keep this import
// import Enquiry from './Enquiry.jsx' // <--- You no longer need to import Enquiry here if App renders it

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App/> {/* <--- Render your App component here */}
  </StrictMode>,
)