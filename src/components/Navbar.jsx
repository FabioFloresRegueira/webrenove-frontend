/********************************************************
* Navbar.jsx
* crinando um componente para navbar para navegação.
*********************************************************
* obs: digitando o comando rafce é criado automaticamente 
* o componente abaixo:
*********************************************************/
import React from 'react'
//import { useState } from 'react';

import './Navbar.css'; 
import webrenovelogo from '../assets/logowebrenove.jpg'; 
import logoajuda from '../assets/logoajuda.png'; 

import Modal from 'react-modal'; 
Modal.setAppElement('#root');

const Navbar = () => {

// Hook que demonstra se a modal está aberta ou não
const [modalIsOpen, setIsOpen] = React.useState(false);

// Função que abre a modal
function abrirModal() {
    setIsOpen(true);
}

// Função que fecha a modal
function fecharModal() {
    setIsOpen(false);
}

  return (
    <nav className='navbar'>
        <ul>
          <li>
            <a href="/" rel="noreferrer">
              <img src={webrenovelogo} className="logo" alt="n/a-img" />
            </a>
          </li>
          <li>
            <h1>Controle de Serviços</h1>
          </li>
        </ul>
        <img src={logoajuda} className="logo" alt="n/a-img" onClick={ abrirModal } />
          <Modal
          style={{
              overlay: {
              backgroundColor: 'darkslategrey',
              borderRadius: '20px',
              opacity: 1,
              top: 250, 
              left: 250, 
              right: 250, 
              bottom: 250
              },
          content: {
              border: '1px solid darkslategrey',
              background: 'darkslategrey' ,
              borderRadius: '20px',
              padding: '0.5px',
              color: "white"
              }
          }}

          isOpen={modalIsOpen}
          onRequestClose={fecharModal}
          contentLabel="Saiba Mais+"
          //className="modal"
          //overlayClassName="modal-overlay"
          >
          <h1>Olá, venho apresentar o meu Projeto de desenvolvimento Web Full Stack.</h1>
          <hr></hr>
          <div>
            <h2>Fabio Flores Regueira</h2>
            <h3>Agradecimentos</h3>
            <h4>Agradeço a Deus, a Universidade Unyleya, aos orientadores e a minha familia pelo apoio e conclusão deste Projeto full stack.</h4>
            <h3>Tecnologias aplicadas: </h3>
            <h4>Servidor Web: Xammp</h4>            
            <h4>Banco de dados: MySql</h4>
            <h4>Back End: Java Spring Boot, Rest Full, Persistencia JPA MySql</h4>
            <h4>Front End: React e Axios</h4>
            <h5>(c)Copyright 2023 - todos os direitos reservados.</h5>
          </div>
          <button className='btnfecharmodal' onClick={fecharModal}>Fechar</button>
          </Modal>
    </nav>
  )
}

export default Navbar
