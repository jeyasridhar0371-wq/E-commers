import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Usecontext from './component/Usecontext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Usecontext>
    <App />
    </Usecontext>
  </StrictMode>,
)
