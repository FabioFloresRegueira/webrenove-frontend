/********************************************************
* HOME.JSX 
* tela principal da aplicação
*********************************************************
* obs: digitando o comando rafce é criado automaticamente 
* o componente abaixo:
*********************************************************/
import React from 'react'
import { useState, useEffect  } from 'react';
import { useNavigate } from 'react-router-dom'; 

import { useForm } from "react-hook-form"; 
//import { Error } from "@hookform/error-message";

import moment from 'moment'; 
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { ToastContainer, toast } from  'react-toastify' ;
import  'react-toastify/dist/ReactToastify.css';

import './Home.css'; 
import iconservico from '../assets/logoitem1.png'; 
import iconfiltro from '../assets/iconfiltro.png'; 
import axiosEndPoints from "../axios/configaxios"; 


const Home = () => {

    moment.locale('pt-br'); 

    const [descricao, setdescricao] = useState(""); 
    const [tipo, settipo] = useState(""); 
    const [dtinirenovacao, setdtinirenovacao] = useState(""); 
    const [dtexpiracao, setdtexpiracao] = useState("");
    const [info, setinfo] = useState(""); 
    const [risco, setrisco] = useState("");
    const [status, setstatus] = useState(""); 
    const [registro, setregistro] = useState([]); 

    // form 
    const  { handleSubmit, register, watch, formState: {Error} } = useForm(); 
    
    const onSubmit = (data) => console.log(data);

    // filtro 
    const [q, setQ] = useState("");
    const [searchParam] = useState(["descricao", "name"]);
    const [filterParam, setFilterParam] = useState(["Todas"]); 

    useEffect(()=>{
      getRegistro(); 

    },[])
    
    const notificar = (msg) => toast(msg); 

    //--------------//
    // Metodo:(Get) //
    //--------------//
    const getRegistro = async()=>{
        try{
            const dados = await axiosEndPoints.get('/listaservicos');
        
            setregistro(dados.data); 
    
        } catch (err) {
    
            console.log(err); 
    
        }
    }
    
    //---------------//
    // Metodo:(Post) //
    //---------------//
    const postRegistro = async()=>{
        try{  
            await axiosEndPoints.post('/adicionaservico', {
            descricao: descricao, 
            tipo: tipo, 
            dtinirenovacao: dtinirenovacao,
            dtexpiracao: dtexpiracao, 
            info: info, 
            risco: risco, 
            status: status
            });
            getRegistro();  // faz o reload trazendo dados da task do bd
            notificar("[Post] - Registro incluido com sucesso. . . "); 
        } catch (err) { 
            console.log(err); 
        }
    }

    //---------------//
    // Metodo:(delete)  //
    //---------------//
    const delRegistro = async (id) =>{
        try {
            await axiosEndPoints.delete('/deletaservico/' + id,{

            });
            getRegistro();  
            notificar("[del] - Registro apagado com sucesso. . . "); 
        } catch (err) {
            console.log(err); 
        } 
    }


    //---------------//
    // Metodo:(Put)  //
    //---------------//
    const putmudastatus = async(id, status)=>{
        try {
            await axiosEndPoints.put('/mudastatusservico/' + id, {
                status: status,
            });
            console.log(status); 
            getRegistro(); 
            notificar("[Put] - Status do registro atualizado com sucesso. . . "); 
        } catch (err) {
            console.log(err); 
        } 
    }

    //-----------------------------//
    // Redirecionamento de Páginas //
    //-----------------------------//
    let navigate = useNavigate();
    const redireciona = (parampath, paramitem) =>{
        let path = parampath +  paramitem; 
        return navigate(path, paramitem); 
    }


    //-----------------------------//
    // Filtro                      //
    //-----------------------------//
    function filtrar(items) {
        // eslint-disable-next-line array-callback-return
        return items.filter((item) => {
        if (item.tipo === filterParam) {
            return searchParam.some((newItem) => {
                return (
                    item[newItem]?.toString()?.toLowerCase()?.indexOf(q.toLowerCase()) > -1
                );
            });
            } else if (filterParam === "Todas") {
                    return searchParam.some((newItem) => {
                        return (
                            item[newItem]?.toString()?.toLowerCase()?.indexOf(q.toLowerCase()) > -1
                        );
                     });
                 }
             });
         }

   
    return (
        <div className="container-home" >

          <ToastContainer /> 

                <div className="container-left">

                    
                    <form onSubmit = { onSubmit(handleSubmit) } className="container-form">

                        <h1>Adicionando Servicos</h1>
                        <p>Controle de forma eficais as renovações de serviços e tome suas decisões em tempo hábil.</p>

                        <label htmlFor="frmdescricao">Descrição:</label>
                        <input  className='inputdescricao' type="text" 
                                name="descricao" 
                                id="descricao" 
                                placeholder="informe a descricao do serviço."
                                onChange={(e) => setdescricao(e.target.value)}
                                {...register("descricao", {required:  true , maxLength: 50})}
                        />

                        <label htmlFor="frmtipo">Categoria:</label>
                        <select name="tipo" 
                            id="tipo" 
                            placeholder='escolha o tipo de serviço.' 
                            onChange={(e) => settipo(e.target.value)}       
                        >
                            <option value="Licenciamento">Licenciamento</option>
                            <option value="Extenção Garantia">Extenção Garantia</option>
                            <option value="Dominio">Dominio</option>
                            <option value="Hospedagem">Hospedagem</option>
                            <option value="Certificado">Certificado</option>
                        </select>

                        <label htmlFor="frmdtinirenovacao">Renovado em:</label>
                        <DatePicker 
                            className='inputdatapicker'
                            showIcon
                            isClearable
                            placeholderText="informe a data"
                            dateformat="DD/MM/YYYY" 
                            selected={dtinirenovacao}       
                            onChange={(data)=>setdtinirenovacao(data)} 
                        />

                        <label htmlFor="frmdtexpiracao">Expira em:</label>
                        <DatePicker
                            className='inputdatapicker'
                            showIcon
                            isClearable
                            placeholderText="informe a data"
                            dateformat="DD/MM/YYYY" 
                            selected={dtexpiracao}       
                            onChange={(data)=>setdtexpiracao(data)} 
                        />

                        <label htmlFor="frminfo">Informações para renovação:</label>
                        <textarea name="info"
                            id="info"
                            placeholder="informe as instruções para renovação do serviço." 
                            onChange={(e) => setinfo(e.target.value)} 
                        >
                        </textarea>

                        <label htmlFor="frmrisco">Risco:</label>
                        <select name="risco" 
                            id="risco" 
                            placeholder='escolha o nivel do risco.' 
                            onChange={(e) => setrisco(e.target.value)}       
                        >
                            <option value="Baixo">Baixo</option>
                            <option value="Medio">Medio</option>
                            <option value="Alto ">Alto</option>
                        </select>

                        <label htmlFor="frmstatus">Status do serviço:</label>
                        <div className="container-radio">
                            <label>
                                <input name="radiostatus" 
                                    type="radio" 
                                    value="1" defaultChecked 
                                    onChange={(e)=>setstatus(1)} 
                                />
                                Ativo
                            </label>
                            <label>
                                <input name="radiostatus" 
                                    type="radio" 
                                    value="0" 
                                    onChange={(e)=>setstatus(0)} 
                                />
                                 Inativo
                            </label>
                        </div>

                        <div className='container-botoes'> 
                            <button type="submit" value="adicionar" onClick={postRegistro} className="btn-salvar">ADICIONAR</button>
                            <button onClick={() =>{}} className="btn-salvar">LIMPAR CAMPOS</button>
                        </div>

                    </form>

                </div>

                    <div>
                        { filtrar(registro).map(item => {

                            // formatar o item.data para a exibição
                            const formatteddate = moment(item.dtexpiracao).format('DD MMMM YYYY');

                            return (
                                
                                <div key={item.id} className="container-servicos">
                                    <div>
                                        <img src={iconservico} className="logo" alt="n/a-img" />
                                    </div>
                                    <div> 
                                        <div>
                                            <h1 className='txtdescricao' style= { item.status === 1 ? {} : {textDecoration: 'line-through red'}}>{item.descricao}</h1>
                                            <h2>{item.tipo} expira em {formatteddate}</h2>
                                        </div> 

                                        <div> 
                                            <hr></hr>
                                            <h3>Para renovações seguir informações abaixo:</h3>
                                            <p className='txtinfo'>{item.info}</p>
                                        </div>

                                        <div className='container-botoes'>
                                            <button className = "btnacaocard" onClick={ () => {redireciona('/detalhes/', item.id)} }>Editar</button>
                                            <button className = "btnacaocard" onClick={ () => putmudastatus(item.id, 1) }>Ativar</button>
                                            <button className = "btnacaocard" onClick={ () => putmudastatus(item.id, 0) }>inativar</button>
                                            <button className = "btnacaocard" onClick={ () => delRegistro(item.id) }>Excluir</button>
                                        </div>
                                    </div>
                                </div>
                                )
                            })}
                    </div>

                    <div className='container-filtro'>
                        <div className='container-filtro-logo'>
                            <img src={iconfiltro} className="logo" alt="n/a-img" />
                            <h1>FILTRO</h1>
                        </div>
                        <div className='container-filtro-campos'>
                            <ul>
                                <li>
                                    <div>
                                        <label htmlFor="search-form">Pesquisar por descrição:</label>
                                    </div>
                                    <div>
                                            <input
                                                type="search"
                                                name="search-form"
                                                id="search-form"
                                                className="search-input"
                                                placeholder="Pesquisar . . . "
                                                value={q}
                                                onChange={(e) => setQ(e.target.value)}
                                            />
                                    </div>
                                </li>
                                <li>
                                    <div>
                                        <label htmlFor="frmtipo">Categoria:</label>
                                    </div>
                                    <div>
                                        <select name="tipo" 
                                            id="tipo" 
                                            placeholder='selecie a categoria.' 
                                            onChange={(e) =>  setFilterParam(e.target.value)}       
                                        >
                                            <option value="Todas">Todas</option>
                                            <option value="Licenciamento">Licenciamento</option>
                                            <option value="Extenção Garantia">Extenção Garantia</option>
                                            <option value="Dominio">Dominio</option>
                                            <option value="Hospedagem">Hospedagem</option>
                                            <option value="Certificado">Certificado</option>
                                        </select>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <div className='container-filtro-botoes'>
                            <button className = "btnfiltro" onClick={ () => {} }>FILTRAR</button>
                        </div>
                    </div>
        </div>
    );
    

}

export default Home




/*
                                ref={  register({
                                            required: "Required",
                                            pattern: {
                                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                                                    message: "invalid email address"
                                        }
                                    })}

                        {Error.descricao && Error.descricao.message}

*/

