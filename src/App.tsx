import { RouterProvider } from 'react-router-dom'
import './index.css'
import routes from './routes'
import AuthProvider from './contexts/auth'

function App() {
  return(
    <AuthProvider>
     <RouterProvider router={routes}/>
    </AuthProvider>
  )
}
  
export default App
