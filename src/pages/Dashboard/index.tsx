import { AuthContext } from "../../contexts/auth"
import { useContext, useEffect, useState } from "react"
import Header from "../../components/Header"
import Title from "../../components/Header/Title"
import { FiEdit2, FiMessageSquare,FiPlus, FiSearch } from "react-icons/fi"
import { Link } from "react-router-dom"
import { getDocs,collection,doc,orderBy,limit,startAfter, query} from "firebase/firestore"
import { db } from "../../services/firebaseConfig"

import './index.css'
import { format } from "date-fns"

export default function Dashboard(){
    const{logout}= useContext(AuthContext)
    const [chamados,setChamados]=useState([])
    const [loading, setLoading]=useState('Carregando')
    const[isEmpty,setIsEmpty]=useState(false)

    const listRef = collection(db,'chamados')

    useEffect(()=>{
        async function loadChamados(){
            const q = query(listRef,orderBy('created','desc'),limit(5))
            const querySnapshot = await getDocs(q)
            await updateState(querySnapshot)

            setLoading(false)
        }

        loadChamados()

        return ()=>{}
    },[])

    async function updateState(querySnapshot){
        const isCollectionEmpty = querySnapshot.size === 0
        if(!isCollectionEmpty){
            const lista = []
            querySnapshot.forEach((doc)=>{
                lista.push({
                    id:doc.id,
                    assunto:doc.data().assunto,
                    cliente:doc.data().cliente,
                    clienteId:doc.data().clienteId,
                    complemento:doc.data().complemento,
                    created:doc.data().created,
                    createdFormat:format(doc.data().created.toDate(),'dd/MM/yyyy'),
                    status:doc.data().status,

                })
            })

            setChamados(chamados=>[...chamados,...lista])
        }else{
            setIsEmpty(true)
        }
    }

    if(loading){
        return(
            <div>
                <Header/>
                <div className="content">
                    <Title name = 'Tickets'>
                        <FiMessageSquare size={25}/>
                    </Title>
                    <span>Buscando chamados...</span>
                </div>
            </div>
        )
    }

    
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

            



                {chamados.length === 0?(
                    <h1>{loading}</h1>
                ):(
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
                    {
                        chamados.map((item,index)=>{
                            return(
                                <tr key={index}>
                        <td data-label = 'cliente'>{item.cliente}</td>
                        <td data-label = 'Assunto'>{item.assunto}</td>
                        <td data-label = 'Status'>
                        <span style={{backgroundColor:'gray'}}>{item.status}</span>
                        </td>
                        <td data-label = 'Cadastrado'>{item.createdFormat}</td>
                        <td data-label = '#'>
                            <button className="action" style={{backgroundColor:"blue"}}>
                                <FiSearch color="#fff" size={17} />
                            </button>
                            <button className="action"  style={{backgroundColor: 'orange'}}>
                                <FiEdit2 color="#fff" size={17} />
                            </button>
                        </td>
                    </tr>
                            )
                        })
                    }

                   
                    
                </tbody>
            </table>

                )

                }
                
        </div>
            
           
        </div>
    )
}