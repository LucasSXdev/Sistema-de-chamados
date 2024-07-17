import Header from "../../components/Header"
import Title from "../../components/Header/Title"
import { FiSettings, FiUpload } from "react-icons/fi"
import './style.css'
import avatar from '../../assets/avatar.png'
import { AuthContext } from "../../contexts/auth"
import { useContext, useState } from "react"

export default function Profile(){
    const{user}=useContext(AuthContext)
    const [avatarUrl,setAvatarUrl]= useState(user?.avatar_url?? undefined)

    return(
        <div>
            <Header/>

            <div className="content">
                <Title name='Minha conta'>
                    <FiSettings size={25}/>
                </Title>
            </div>

            <div className="container">
                <form className="form_profile">
                    <label className="label_avatar">
                        <span>
                            <FiUpload color="#fff" size={25}/>
                        </span>

                        <input type="file" accept="image/*" /> <br />
                        {avatarUrl === undefined?(
                            <img src={avatar} alt="Foto de perfil" />
                        ):(
                            <img src={avatarUrl} alt="Foto de perfil" width={250} height={250} />
                        )}


                    </label>
                </form>
            </div>
        </div>
    )
}