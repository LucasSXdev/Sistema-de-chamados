import { Outlet, RouterProvider } from 'react-router-dom'
import './index.css'
import routes from './routes'

function App() {
  return(
    <RouterProvider router={routes}>
      <Outlet/>
    </RouterProvider>
  )
}
  
export default App
