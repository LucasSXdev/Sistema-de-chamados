import Header from "../../components/Header"
import Title from "../../components/Header/Title"
import { FiSettings, FiUpload } from "react-icons/fi"
import './style.css'
import avatar from '../../assets/avatar.png'
import { AuthContext } from "../../contexts/auth"
import { useContext, useState } from "react"
import { doc, updateDoc } from "firebase/firestore"
import { db, storage } from "../../services/firebaseConfig"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { getDownloadURL, ref, uploadBytes } from "firebase/storage"

export default function Profile(){
    const{user,storageUser,setUser,logout}=useContext(AuthContext)
    const [avatarUrl,setAvatarUrl]= useState(user?.avatar_url?? undefined)
    const [imageAvatar,setImageAvatar]= useState<File|null>(null)
    const [nome,setNome]= useState(user && user.name)
    const [email,setEmail]=useState(user && user.email)
    const navigate = useNavigate()

    useEffect(() => {
        if (!user) {
            
            navigate('/profile')
        }
    }, [user,navigate])

    function handleFile(ev:React.ChangeEvent<HTMLInputElement>){
        const files = ev.target.files?.[0]
        if(files){
            const image = ev.target.files?.[0]
            if(image?.type === 'image/jpeg' || image?.type === 'image/png'){
                setImageAvatar(image)
                setAvatarUrl(URL.createObjectURL(image))
            }else{
                alert('envie uma imagem do tipo png ou jpeg')
                setImageAvatar(null)
                return
            }

        }
    }

    async function handleSubmit(ev:React.FormEvent<HTMLFormElement>){
        ev.preventDefault()

        if (!user?.uid) {
            alert("Usuário não autenticado.")
            return
        }

        if(imageAvatar === null || imageAvatar && nome !== ''){
            const docRef = doc(db,'users',user?.uid)
            await updateDoc(docRef,{
                name:nome
            })
            .then(()=>{
             const data :{name:string|null}={
                    name:nome
                }

                setUser(data)
                storageUser(data)
                alert('usuario atualizado')
            })
        }
    }

    async function handleUpload(){
        if (!user?.uid) {
            alert("Usuário não autenticado.");
            return;
          }

        const currentUid = user?.uid
        const uploadRef = ref(storage,`image/${currentUid}/${imageAvatar?.name}`)

        if (!imageAvatar) {
            alert('Por favor, selecione uma imagem primeiro.');
            return;
        }

        const uploadTask = uploadBytes(uploadRef,imageAvatar)
        .then((snapshot)=>{ 
            getDownloadURL(snapshot.ref).then(async(dowloadUrl)=>{
                const urlFoto = dowloadUrl;
                const docRef = doc(db,'users',currentUid)
                await updateDoc(docRef,{
                    avatarUrl:urlFoto,
                    name:nome
                })
                .then(()=>{
                    const data:{name:string|null,avatar_url:string}= {
                        ...user,
                        name:nome,
                        avatar_url:urlFoto
                    }

                    setUser(data)
                    storageUser(data)
                    alert('Atualizado com sucesso')
                })
            })
        })
    }

    return(
        <div>
            <Header/>

            <div className="content">
                <Title name='Minha conta'>
                    <FiSettings size={25}/>
                </Title>
            </div>

            <div className="container">
                <form className="form_profile" onSubmit={handleSubmit}>
                    <label className="label_avatar">
                        <span>
                            <FiUpload color="#fff" size={25}/>
                        </span>

                        <input type="file" accept="image/*" onChange={handleFile} /> <br />
                        {avatarUrl === undefined?(
                            <img src={avatar} alt="Foto de perfil" />
                        ):(
                            <img src={avatarUrl} alt="Foto de perfil" width={250} height={250} />
                        )}

                    </label>

                    <label>Nome</label>
                    <input type="text" value={nome|| ''} onChange={(e)=> setNome(e.target.value)} />

                    <label>Email</label>
                    <input type="text" value={email || ''} disabled={true}/>

                    <button type="submit" onClick={handleUpload} >Salvar</button>
                </form>
            </div>

            <div className="container">
                <button className="logout_btn" onClick={()=>logout()}>Sair</button>
            </div>
        </div>
    )
}