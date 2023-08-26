/********************************************************
* detalhes.JSX 
* Tela de manuteção total do cadastro
*********************************************************
* obs: digitando o comando rafce é criado automaticamente 
* o componente abaixo:
*********************************************************/
import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { useParams, useNavigate} from 'react-router-dom'; 

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//import {FaArrowLeft} from 'React-icons/fa';
//<FaArrowLeft/>

import moment from 'moment'; 

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import './Detalhes.css'; 

import axiosEndPoints from "../axios/configaxios";  

const Detalhes = () => {
    
  const { id } = useParams(); 

  moment.locale('pt-br'); 

  const [descricao, setdescricao] = useState(""); 
  const [tipo, settipo] = useState(""); 
  const [dtinirenovacao, setdtinirenovacao] = useState(""); 
  const [dtexpiracao, setdtexpiracao] = useState("");
  const [info, setinfo] = useState(""); 
  const [risco, setrisco] = useState("");
  const [status, setstatus] = useState(""); 

  //const [registro, setregistro] = useState([]); 


  //const notificar = (msg) => toast.info(msg); 
  const notificar = (msg) => {toast(msg, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  })}

  useEffect(()=>{
    //--------------//
    // Metodo:(Get) //
    //--------------//
    const getumRegistro = async () => {
            try{
                const dados = await axiosEndPoints.get('/listaumservico/' + id);
    
                // pode ser usado como um map pada demonstas os campos 
                //setregistro(dados.data); // ainda não usado. 
                
                // buscando os campos da base de dados e alimentando as variaveis. 
                setdescricao(dados.data.descricao); 
                settipo(dados.data.tipo);
        
                const formattedtinirenovacao = new Date(dados.data.dtinirenovacao);
                setdtinirenovacao(formattedtinirenovacao);
        
                const formatteddtexpiracao = new Date(dados.data.dtexpiracao);
                setdtexpiracao(formatteddtexpiracao);
        
                setinfo(dados.data.info);
                setrisco(dados.data.risco);
                setstatus(dados.data.status);
                //--------------------------------------------------------------

                console.log(dados.data);
        
            } catch (err) {

                console.log(err); 

            }

    }
    getumRegistro(); 
},[id])


  //---------------//
  // Metodo:(Put)  //
  //---------------//
  const putRegistro = async(id)=>{
    try {
        await axiosEndPoints.put('/atualizaservico/'+ id ,{
            descricao: descricao, 
            tipo: tipo, 
            dtinirenovacao: dtinirenovacao,
            dtexpiracao: dtexpiracao, 
            info: info, 
            risco: risco, 
            status: status, 
        });
        console.log(status); 
        notificar("[Put] - Status do registro atualizado com sucesso. . . ");
        //getumRegistro(); 
    } catch (err) {
        console.log(err); 
    } 
  }


  let navigate = useNavigate();
  const redireciona = () =>{
      return navigate('/'); 
  }


  return (
        <div className="container-edicao">

            <ToastContainer />

            <div className="container-numero">
                <h1>{id}</h1>
            </div>

            <div className="container-campos">

                <h1>FORMULÁRIO DE EDIÇÃO</h1>

                <div>
                    <label htmlFor="frmdescricao">Descrição:</label>
                    <input  className='inputdescricao' type="text" 
                            name="descricao" 
                            id="descricao" 
                            placeholder="informe a descricao do serviço."
                            value={descricao}
                            onChange={(data) => setdescricao(data.target.value)}
                    />
                </div>

                <div>
                    <label htmlFor="frmtipo">Categoria:</label>
                    <select name="tipo" 
                        id="tipo" 
                        placeholder='escolha o tipo de serviço.' 
                        value={tipo}
                        onChange={(data)=>settipo(data.target.value)} 
                    >
                        <option value="Licenciamento">Licenciamento</option>
                        <option value="Extenção Garantia">Extenção Garantia</option>
                        <option value="Dominio">Dominio</option>
                        <option value="Hospedagem">Hospedagem</option>
                        <option value="Certificado">Certificado</option>
                    </select>
                </div>

                <div>
                    <label htmlFor="frmdtinirenovacao">Renovado em:</label>
                    <DatePicker 
                        className='inputdatapicker'
                        showIcon
                        isClearable
                        placeholderText="informe a data"
                        dateformat="DD/MM/YYYY" 
                        selected={dtinirenovacao} 
                        value={dtinirenovacao}      
                        onChange={(data)=>setdtinirenovacao(data)} 
                    />
                </div>
                <div>
                    <label htmlFor="frmdtexpiracao">Expira em:</label>
                    <DatePicker
                        className='inputdatapicker'
                        showIcon
                        isClearable
                        placeholderText="informe a data"
                        dateformat="DD/MM/YYYY" 
                        selected={dtexpiracao}
                        value={dtexpiracao}       
                        onChange={(data)=>setdtexpiracao(data)} 
                    />
                </div>
                <div>
                    <label htmlFor="frminfo">Informações para renovação:</label>
                    <textarea name="info"
                        id="info"
                        placeholder="informe as instruções para renovação do serviço."
                        value={info} 
                        onChange={(data) => setinfo(data.target.value)} 
                    >
                    </textarea>
                </div>
                <div>
                    <label htmlFor="frmrisco">Risco:</label>
                    <select name="risco" 
                        id="risco" 
                        placeholder='escolha o nivel do risco.' 
                        value={risco}
                        onChange={(data) => setrisco(data.target.value)}       
                    >
                        <option value="Baixo">Baixo</option>
                        <option value="Medio">Medio</option>
                        <option value="Alto ">Alto</option>
                    </select>
                </div>

                <div>
                    <label htmlFor="frmstatus">
                        Status do Serviço: {status}<h2>{status === 1 ? <p style={{ color: 'blue' }}>ATIVO</p> : <p style={{ color: 'red' }}>INATIVO</p> }</h2>
                    </label>
                </div>

           </div>
           <div className="container-botoes">
                <ul>
                    <li>
                        <button className='btnacao' onClick={()=>{putRegistro(id)}}>Salvar edição</button>
                    </li>
                    <li>
                        <button className='btnacao' onClick={redireciona}>Retornar</button>
                    </li>
                </ul>
            </div>
        </div>
  )
}  
export default Detalhes