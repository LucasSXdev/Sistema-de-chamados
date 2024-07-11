import { createBrowserRouter } from "react-router-dom";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Private from "./pages/Private";
import Profile from "./pages/Profile";


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
        path:'profile',
        element:<Private><Profile/></Private>
      },
    
    ],
);

export default routes;
