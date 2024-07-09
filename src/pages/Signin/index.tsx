import { Link, useNavigate } from 'react-router-dom'
import './index.css'
import { useState } from 'react'
import { useContext } from 'react'
import { AuthContext } from '../../contexts/auth'




export default function Signin(){
    const[email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const navigate = useNavigate()

    const {signIn,}= useContext(AuthContext)

    async function handleSignIn(ev:React.FormEvent<HTMLFormElement>){
        ev.preventDefault()

        if (email && password){
            await signIn(email,password,()=>navigate('/dashboard'))
            setEmail('')
            setPassword('')
            return
        }

        alert('preencha os campo')

        
    }

    return(
        <div className='container-center'>
            <div className='login'>
                <div className='login-area'>
                    <h1>Login</h1>
                </div>

                <form onSubmit={handleSignIn}>
                    <h1>Entrar</h1>
                    <input type="text"
                    placeholder='Email@email.com'
                    value={email}
                    onChange={e=>setEmail(e.target.value)}
                    />
                    <input type="password" 
                    placeholder='********'
                    value={password}
                    onChange={e=>setPassword(e.target.value)}
                    />

                    <button type='submit'>Acessar</button>
                </form>
                <Link to='/register'>Criar uma conta</Link>
            </div>
        </div>
    )
}