import { FiPlusCircle } from "react-icons/fi"
import Header from "../../components/Header"
import Title from "../../components/Header/Title"
import './index.css'

export default function New(){
    return(
       <div>
            <Header/>
            <div className=" content">
                <Title name="Novo chamado">
                    <FiPlusCircle size={25}/>
                </Title>

                <div className="container">
                    <form className="form_profile">
                        <label>Clientes</label>
                        <select >
                            <option key={1} value={1}>Mercado testes</option>
                            <option key={2} value={2}>Loja informatica</option>
                        </select>

                        <label>Assunto</label>
                        <select >
                            <option key={1} value='suporte'>Suporte</option>
                            <option key={2} value='visita tecnica'>Visita técnica</option>
                            <option key={2} value='financeiro'>Financeiro</option>
                        </select>

                        <label>Status</label>
                        <div className="status" >
                            <input type="radio"
                            name="radio"
                            value={"aberto"}/>

                            <span>Aberto</span>

                            <input type="radio"
                            name="radio"
                            value={"progresso"}/>

                            <span>Em progresso</span>

                            <input type="radio"
                            name="radio"
                            value={"atendido"}/>

                            <span>Atendido</span>
                        </div>

                        <label >Complemento</label>
                        <textarea 
                        type = "text"
                        placeholder="Descreva seu problema (opcional)"/>

                        <button type="submit">Registrar</button>

                        
                    </form>
                </div>
            </div>
       </div> 
    )
}