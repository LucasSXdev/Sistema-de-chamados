import { Navigate } from "react-router-dom"
import { AuthContext, AuthProviderProps } from "../../contexts/auth"
import { useContext } from "react"

export default function Private({children}:AuthProviderProps){


    const {signed,loading} = useContext(AuthContext)

    if(loading){
        return <div></div>
    }

    if(!signed){
        return <Navigate to={'/'}/>
    }

    

    return children
}