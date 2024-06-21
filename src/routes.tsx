import { createBrowserRouter } from "react-router-dom";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";

const routes = createBrowserRouter([
    {
        path:'/',
        element:<Signin/>
    },
    {
        path:'/register',
        element:<Signup/>
    }
])

export default routes