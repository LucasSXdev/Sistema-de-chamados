import { FiUser } from "react-icons/fi";
import Header from "../../components/Header";
import Title from "../../components/Header/Title";
import {useState } from "react";
import { db } from "../../services/firebaseConfig";
import { addDoc,collection } from "firebase/firestore";

export default function Customers(){
    const[nome,setNome]= useState('')
    const[cnpj,setCnpj]=useState('')
    const[endereco,setEndereco]=useState('')

    async function handleRegister(ev:React.FormEvent<HTMLFormElement>){
        ev.preventDefault()
        
        if(nome!==''&& cnpj !== ''&& endereco!==''){
            await addDoc(collection(db,'customers'),{
                nomeFantasia:nome,
                cnpj:cnpj,
                endereco:endereco
            })
            .then(()=>{
                setNome('')
                setCnpj('')
                setEndereco('')
                alert('cadastrado com sucesso!')
            })
            .catch(error=>{
                alert(error)
            })
        }else{
            alert('Preencha todos os campos')
        }
    }

    return(
        
        <div>
            <Header/>
            <div className="content">
                <Title name="Clientes">
                    <FiUser size={25}/>
                </Title>
            </div>

            <div className="container">
                <form className="form_profile" onSubmit={handleRegister}>
                    <label>Nome fantasia</label>
                    <input 
                    type="text"
                    placeholder="nome da empres"
                    value={nome}
                    onChange={(e)=>setNome(e.target.value)} />

                    <label>CNPJ</label>
                    <input 
                    type="text"
                    placeholder="Digite o CNPJ"
                    value={cnpj}
                    onChange={(e)=>setCnpj(e.target.value)} />

                    <label>Endereço</label>
                    <input 
                    type="text"
                    placeholder="Digite seu endereço"
                    value={endereco}
                    onChange={(e)=>setEndereco(e.target.value)} />

                    <button type="submit">Cadastrar</button>

                </form>
                
            </div>

        </div>
    )
}