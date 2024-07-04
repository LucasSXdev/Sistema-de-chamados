import { Link } from 'react-router-dom'
import './index.css'
import { useState } from 'react'

export default function Signup(){
    const [name,setName]=useState('')
    const[email,setEmail]=useState('')
    const [password,setPassword]=useState('')

    return(
        <div className='container-center'>
            <div className='login'>
                <div className='login-area'>
                    <h1>Login</h1>
                </div>

                <form>
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

                    <button type='submit'>Cadastrar</button>
                </form>
                <Link to='/'>já possui uma conta?Registrar</Link>
            </div>
        </div>
    )
}