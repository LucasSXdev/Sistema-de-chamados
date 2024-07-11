import Header from "../../components/Header"
import Title from "../../components/Header/Title"
import { FiSettings } from "react-icons/fi"

export default function Profile(){
    return(
        <div>
            <Header/>
            <div className="content">
                <Title name='minha conta'>
                    <FiSettings size={25}/>
                </Title>
            </div>
        </div>
    )
}