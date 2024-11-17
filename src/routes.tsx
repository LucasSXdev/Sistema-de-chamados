import { createBrowserRouter } from "react-router-dom";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Private from "./pages/Private";
import Profile from "./pages/Profile";
import Customers from "./pages/Customers";
import New from "./pages/New";


const routes = createBrowserRouter([
      {
        path: '/',
        element: <Signin />,
      },
      {
        path: 'register',
        element: <Signup />,
      },
      {
        path: 'dashboard',
        element: <Private><Dashboard /></Private>
      },
      {
        path:'settings',
        element:<Private><Profile/></Private>
      },
      {
        path:'customers',
        element:<Private><Customers/></Private>
      },
      {
        path:'new',
        element:<New/>
      }
    
    ],
);

export default routes;
