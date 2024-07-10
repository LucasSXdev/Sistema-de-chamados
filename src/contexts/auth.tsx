import { useState,createContext,ReactNode, useEffect } from "react";
import { signInWithEmailAndPassword,createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { doc,setDoc,getDoc } from "firebase/firestore";
import {auth,db} from '../services/firebaseConfig'

interface AuthContextType {
    signed: boolean;
    loadingAuth:boolean
    loading:boolean
    user: userData | null;
    signIn: (email: string, password: string,navigate:()=>void) => Promise<void>;
    signUp: (email: string, password: string, username: string,navigate:()=>void) => Promise<void>;
    logout: ()=>Promise<void>
}

export interface userData {
    uid:string,
    name:string,
    email:string|null,
    avatar_url:string|undefined
}

export interface AuthProviderProps {
    children: ReactNode;
}

export const AuthContext = createContext<AuthContextType>({} as AuthContextType);


function AuthProvider({children}:AuthProviderProps){
    const[user,setUser]= useState<userData|null>(null)
    const [loadingAuth,setLoadingAuth]= useState(false)
    const[loading,setLoading]=useState<boolean>(true)

    useEffect(()=>{
        const loadUser = ()=>{
            const storageUser = localStorage.getItem('tickets')

            if(storageUser){
                setUser(JSON.parse(storageUser))
                setLoading(false)
            }
        }

        loadUser()
    },[])
    
     
    async function signIn(email:string,password:string,navigate:()=>void){
        setLoadingAuth(true)
        await signInWithEmailAndPassword(auth,email,password)
        .then(async(value)=>{
            const uid = value.user.uid
            const docRef = doc(db,'users',uid)
            const docSnap = await getDoc(docRef)

            if(docSnap.exists()){
                const data :userData ={
                    uid:uid,
                    name:docSnap.data()?.name,
                    email:value.user.email,
                    avatar_url:docSnap.data()?.avatar_url
                }

                setUser(data)
                storageUser(data)
                navigate()
            }else{
                alert('documento nao encontrado!')
            }

            setLoadingAuth(false)
        })
        .catch(error=>{
            alert('usuário nao existe'+error)
            setLoadingAuth(false)
        })
    }

    async function signUp(email:string,password:string,username:string,navigate:()=>void){
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
                    avatar_url:undefined
                }

                setUser(data)
                storageUser(data)
                setLoadingAuth(false)
                navigate()
                alert('seja bem vindo ao sistema!')
            })

            
            
        })
        .catch(error=>{
            alert('nao foi possivel cadastrar um novo usuario'+ error)
        })     
    }

    function storageUser(data:userData){
        localStorage.setItem('tickets',JSON.stringify(data))
    }

    async function logout(){
        await signOut(auth)
        localStorage.removeItem('tickets')
        setUser(null)
    }

    

    return(
        <AuthContext.Provider value={{
            signed:!!user,
            user,
            signIn,
            signUp,
            loadingAuth,
            loading,
            logout
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider