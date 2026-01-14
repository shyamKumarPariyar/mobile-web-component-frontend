import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './style.css'
import App from './App.jsx'
import {BrowserRouter} from 'react-router-dom'
import AuthProvider from './utils/useAuth.jsx'
// import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { HeaderProvider } from './components/common/HeaderContext.jsx'


createRoot(document.getElementById('root')).render(
	<StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <HeaderProvider>
          <App />
        </HeaderProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
)
