import { Link } from 'react-router-dom'
import './index.css'
import { useState } from 'react'

export default function Signin(){
    const[email,setEmail]=useState('')
    const [password,setPassword]=useState('')

    return(
        <div className='container-center'>
            <div className='login'>
                <div className='login-area'>
                    <h1>Login</h1>
                </div>

                <form>
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