import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Counter from './Counter';
import Cricket from './Cricket.jsx';
import Spread from './Spread.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    <Counter></Counter>
    <Cricket></Cricket>
    <Spread></Spread>
  </StrictMode>,
)
