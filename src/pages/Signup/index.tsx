import { Link, } from 'react-router-dom'
import './index.css'
import { useState } from 'react'
import { useContext } from 'react'
import { AuthContext} from '../../contexts/auth'
import { useNavigate } from 'react-router-dom'


export default function Signup(){
    const [name,setName]=useState('')
    const[email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const navigate = useNavigate()

    const{signUp,loadingAuth}= useContext(AuthContext)

    async function handleSubmit(ev:React.FormEvent<HTMLFormElement>){
        ev.preventDefault()

        if(email && password && name){
           await signUp(email,password,name)
            setEmail('')
            setPassword('')
            setName('')
            navigate('/dashboard')
            return
        }

        alert('voce precisa preencher os campos')

    }

    return(
        <div className='container-center'>
            <div className='login'>
                <div className='login-area'>
                    <h1>Login</h1>
                </div>

                <form onSubmit={handleSubmit}>
                    <h1>Cadastrar</h1>
                    <input type="text"
                    placeholder='Nome'
                    value={name}
                    onChange={e=>setName(e.target.value)}
                    />

                    <input type="text"
                    placeholder='Email'
                    value={email}
                    onChange={e=>setEmail(e.target.value)}
                    />
                    <input type="password" 
                    placeholder='********'
                    value={password}
                    onChange={e=>setPassword(e.target.value)}
                    />

                    <button type='submit'>
                        {loadingAuth?'Carregando':'Cadastrar'}
                    </button>
                </form>
                <Link to='/'>já possui uma conta?Registrar</Link>
            </div>
        </div>
    )
}