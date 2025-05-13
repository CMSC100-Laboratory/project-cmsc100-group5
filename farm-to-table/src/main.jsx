import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Header from './components/Header.jsx'
import Sales from './components/Sales.jsx'
import "./index.css"

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Header />
    <Sales />
  </StrictMode>,
)
