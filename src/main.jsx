import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import WrapUp2025 from './components/WrapUp2025'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <WrapUp2025 />
  </StrictMode>,
)
