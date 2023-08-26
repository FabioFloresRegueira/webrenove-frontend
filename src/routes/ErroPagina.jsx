import React from 'react'
import { useNavigate } from 'react-router-dom';


function ErroPagina() {


  let navigate = useNavigate();
  const redireciona = () =>{
      return navigate('/'); 
  }

  return (
    <div>
      <p>Pagina Não encontrada</p>
      <button onClick={redireciona}>Voltar</button>
    </div>
  )
}

export default ErroPagina