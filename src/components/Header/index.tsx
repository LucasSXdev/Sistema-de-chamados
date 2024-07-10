import { useContext } from "react";
import { AuthContext } from "../../contexts/auth";
import { Link } from "react-router-dom";
import { FiHome,FiSettings,FiUser } from "react-icons/fi";
import './index.css'
import avatar from '../../assets/avatar.png'


export default function Header(){
    const{user}= useContext(AuthContext)

    return(
        <div className="sidebar">
            <div className="avatar_container">
                <img src={user?.avatar_url == null ? avatar : user.avatar_url} alt="" />
            </div>
            <Link to={'/dashboard'}>
                <FiHome color="#FFF" size={24}/>
                Chamados
            </Link>
            <Link to={'/profile'}>
                <FiUser color="#FFF" size={24}/>
                Clientes
            </Link>
            <Link to={'/settings'}>
                <FiSettings color="#FFF" size={24}/>
                Profile
            </Link>
        </div>
    )
}