import { createBrowserRouter } from "react-router-dom";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";

const routes = createBrowserRouter([
    {
        path:'/',
        element:<Signin/>
    },
    {
        path:'/register',
        element:<Signup/>
    },
    {
        path:'/dashboard',
        element:<Dashboard/>
    }
])

export default routes