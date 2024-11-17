import { AuthContext } from "../../contexts/auth"
import { useContext } from "react"
import Header from "../../components/Header"
import Title from "../../components/Header/Title"
import { FiEdit2, FiMessageSquare,FiPlus, FiSearch } from "react-icons/fi"
import { Link } from "react-router-dom"

import './index.css'

export default function Dashboard(){
    const{logout}= useContext(AuthContext)

    
    return(
        <div>
            <Header/>

            <div className="content">
                <Title name = 'Tickets'>
                    <FiMessageSquare size={25}/>
                </Title>

            <>
            <Link to='/new' className="new">
                <FiPlus size={25} color="#FFF"/>
                Novo chamado   
            </Link>
            </>

            <table>
                <thead>
                    <tr>
                        <th scope="col">Cliente</th>
                        <th scope="col">Assunto</th>
                        <th scope="col">Status</th>
                        <th scope="col">Cadastrando em</th>
                        <th scope="col">#</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td data-label = 'cliente'>Mercado esquina</td>
                        <td data-label = 'Assunto'>Suporte</td>
                        <td data-label = 'Status'>
                        <span style={{backgroundColor:'gray'}}>Em Aberto</span>
                        </td>
                        <td data-label = 'Cadastrado'>12/05/2022</td>
                        <td data-label = '#'/>
                        <button className="action" style={{backgroundColor:"blue"}}>
                            <FiSearch color="#fff" size={17} />
                        </button>
                        <button className="action"  style={{backgroundColor: 'orange'}}>
                            <FiEdit2 color="#fff" size={17} />
                        </button>
                    </tr>

                    <tr>
                        <td data-label = 'cliente'>tech</td>
                        <td data-label = 'Assunto'>Suporte</td>
                        <td data-label = 'Status'>
                        <span style={{backgroundColor:'gray'}}>Em Aberto</span>
                        </td>
                        <td data-label = 'Cadastrado'>12/05/2022</td>
                        <td data-label = '#'/>
                        <button className="action" style={{backgroundColor:"blue"}}>
                            <FiSearch color="#fff" size={17} />
                        </button>
                        <button className="action"  style={{backgroundColor: 'orange'}}>
                            <FiEdit2 color="#fff" size={17} />
                        </button>
                    </tr>
                    
                </tbody>
            </table>

        </div>
            
           
        </div>
    )
}