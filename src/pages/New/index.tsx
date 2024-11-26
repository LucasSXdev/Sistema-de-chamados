import { FiPlusCircle } from "react-icons/fi"
import Header from "../../components/Header"
import Title from "../../components/Header/Title"
import './style.css'
import { useState } from "react"
import { inputChangeEvent } from "../../contexts/auth"
import { useEffect,useContext } from "react"
import { AuthContext } from "../../contexts/auth"
import { db } from "../../services/firebaseConfig"
import { collection,getDoc,getDocs,doc } from "firebase/firestore"

const listRef = collection(db,'customers')

interface Customer{
    id:number|string,
    nomeFantasia:string
}

export default function New(){
    const{user}=useContext(AuthContext)

    const [loadCustomer,setLoadCustomer]= useState(true)
    const[customers,setCustomers]=useState<Customer[]>([])

    const [complemento,setComplemento]=useState()
    const [assunto, setAssunto]=useState('suporte')
    const[status, setStatus]=useState('Aberto')
    const [customerSelected,setCustomerSelected]=useState<string|number>(0)
    
    useEffect(()=>{
        async function loadCustomers(){
            const querySnapshot = await getDocs(listRef)
            .then((snanpshot)=>{
                const lista:Customer[]=[]
                snanpshot.forEach(doc=>{
                    lista.push(
                        {
                            id:doc.id,
                            nomeFantasia:doc.data().nomeFantasia
                        }
                    )
                })

                if(snanpshot.size === 0){
                    console.log("nenhuma empresa encontrada")
                    setCustomers([{id:'1',nomeFantasia:"Freela"}])
                    setLoadCustomer(false)
                    return
                }

                setCustomers(lista)
                setLoadCustomer(false)

                
            })
            .catch(error=>{
                console.log('Erro ao buscar os clientes',error)
                setLoadCustomer(false)
                setCustomers([{id:1,nomeFantasia:"freela"}])
            })
        }

        loadCustomers()
    },[])

    function handleOptionChange(e:inputChangeEvent){
        setStatus(e.target.value)
        console.log(e.target.value)
    }

    function handleChangeSelect(e:inputChangeEvent){
        setAssunto(e.target.value)
        console.log(e.target.value)
    }

    function handleChangeCustomer(e:inputChangeEvent){
        setCustomerSelected(e.target.value)
        console.log(customers[e.target.value].nomeFantasia)
    }

    return(
       <div>
            <Header/>
            <div className="content">
                <Title name="Novo chamado">
                    <FiPlusCircle size={25}/>
                </Title>

                <div className="container">
                    <form className="form-profile">
                        <label>Clientes</label>
                        {
                            loadCustomer?(
                                <input type="text" disabled={true} value='carregando...' />
                            ):(
                                <select value={customerSelected} onChange={handleChangeCustomer}>
                                {customers.map((item,index)=>{
                                    return(
                                        <option key={index} value={index} id={String(index)}>
                                            {item.nomeFantasia}
                                        </option>
                                    )
                                })}
                            
                        </select>
                            )
                        }
                        

                        <label >Assunto</label>
                        <select value={assunto} onChange={handleChangeSelect}>
                            <option key={1} value={'Suporte'}>Suporte</option>
                            <option key={2} value={'visita técnica'}>Visita técnica</option>
                        </select>

                        <label>Status</label>
                        <div className="status">
                            <input 
                            type="radio"
                            name="radio"
                            value="aberto" 
                            onChange={handleOptionChange}
                            checked={status === "aberto"}/>
                            
                            <span>Em aberto</span>

                            <input 
                            type="radio"
                            name="radio"
                            value="em progresso"
                            onChange={handleOptionChange}
                            checked={status === "em progresso"}/>

                            <span>Progresso</span>

                            <input 
                            type="radio"
                            name="radio"
                            value="Atendido"
                            onChange={handleOptionChange}
                            checked={status === "Atendido"}/>

                            <span>Atendido</span>
                        </div>

                        <label>Complemento</label>
                        <textarea 
                        type="text"
                         placeholder="Descreva seu problema"
                         value={complemento}
                         onChange={(e)=>setComplemento(e.target.value)}/>

                        <button type="submit">Registrar</button>
                    </form>
                </div>
            </div>
       </div> 
    )
}