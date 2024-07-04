import { Outlet, RouterProvider } from 'react-router-dom'
import './index.css'
import routes from './routes'
import AuthProvider from './contexts/auth'

function App() {
  return(
    <AuthProvider>
      <RouterProvider router={routes}>
          <Outlet/>
      </RouterProvider>
    </AuthProvider>
  )
}
  
export default App
