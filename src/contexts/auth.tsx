import { useState,createContext,ReactNode } from "react";
import { signInWithEmailAndPassword,createUserWithEmailAndPassword } from "firebase/auth";
import { doc,setDoc } from "firebase/firestore";
import {auth,db} from '../services/firebaseConfig'



interface AuthContextType {
    signed: boolean;
    loadingAuth:boolean
    user: userData | null;
    signIn: (email: string, password: string) => Promise<void>;
    signUp: (email: string, password: string, username: string) => Promise<void>;
}

interface userData {
    uid:string,
    name:string,
    email:string|null,
    avatar_url:string|null
}

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthContext = createContext<AuthContextType>({} as AuthContextType);

function AuthProvider({children}:AuthProviderProps){
    const[user,setUser]= useState<userData|null>(null)
    const [loadingAuth,setLoadingAuth]= useState(false)
    
    async function signIn(email:string,password:string){
        await signInWithEmailAndPassword(auth,email,password)
        .then(()=>{
            alert('logado com sucesso')
        })
        .catch(error=>{
            alert('usuário nao existe'+error)
        })
    }

    async function signUp(email:string,password:string,username:string){
        setLoadingAuth(true)
        await createUserWithEmailAndPassword(auth,email,password)
        .then(async(value)=>{

            const uid = value.user.uid

            await setDoc(doc(db,'users',uid),{
                name:username,
                avatar_url:null
            })
            .then(()=>{
                const data : userData = {
                    uid:uid,
                    name:username,
                    email:value.user.email,
                    avatar_url:null
                }

                setUser(data)
                setLoadingAuth(false)
                
            })

            
            
        })
        .catch(error=>{
            alert('nao foi possivel cadastrar um novo usuario'+ error)
        })
        
    }

    return(
        <AuthContext.Provider value={{
            signed:!!user,
            user,
            signIn,
            signUp,
            loadingAuth
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider