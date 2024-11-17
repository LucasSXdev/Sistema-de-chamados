import { FiPlusCircle } from "react-icons/fi"
import Header from "../../components/Header"
import Title from "../../components/Header/Title"

export default function New(){
    return(
       <div>
            <Header/>
            <div className=" content">
                <Title name="Novo chamado">
                    <FiPlusCircle size={25}/>
                </Title>

                <div className="container">
                    <form action="
                    "></form>
                </div>
            </div>
       </div> 
    )
}