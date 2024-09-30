import "./style.css";
import Trash from "../../assets/trash.svg";

import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import { useQuery, useMutation } from '@apollo/client';
import { IUser } from "../../interfaces/interfaces";
import {  useRef, useState } from "react";
import { CREATE_USER, DELETE_USER, GET_USERS, UPDATE_USER } from "../../services/queries";


//
// Funçao Home 
//
function Home() {
  const { loading, error, data: usersData, refetch: refatchUsers } = useQuery(GET_USERS);
  const [createUser] = useMutation(CREATE_USER);
  const [updateUser] = useMutation(UPDATE_USER);
  const [deleteUser] = useMutation(DELETE_USER);
  const [newRec, setNewRec] = useState(true)
  const [currentRec, setCurrentRec] = useState("")

  const showToastMessage = (menssage: string, type: number) => {
    switch(type) {
        case 1:
            toast.info(menssage);
            break;
        case 2:
            toast.success(menssage);
            break;
        case 3:
            toast.warning(menssage);
            break;
        case 4:
            toast.error(menssage);
    }
    
  };

  const inputName = useRef<HTMLInputElement | null>(null);
  const inputEmail = useRef<HTMLInputElement | null>(null);
  const inputPassword = useRef<HTMLInputElement | null>(null);
  const inputCpf = useRef<HTMLInputElement | null>(null);

  //
  // HandlerWrite
  //
  const handleWriteUser = () => {
    if (newRec) {
      if (!inputEmail.current?.value) {
        showToastMessage("Informe um email válido!",4);
        inputEmail.current?.focus()
        return
      }
      createUser({ variables: { name: inputName.current?.value, 
                                email: inputEmail.current?.value, 
                                password: inputPassword.current?.value,
                                cpf: inputCpf.current?.value} })
      .then(() => {
        showToastMessage("Cliente adicionado com sucesso!",2);
        clearForm()
        refatchUsers() //atualiza a lista de users
      })
      .catch(() => {
        showToastMessage("Falha ao gravar o registro.",4);
      });    
    } else {
      if (currentRec) {
        console.log("update:",currentRec)
        updateUser({ variables: { 
          id: currentRec, 
          name: inputName.current?.value, 
          email: inputEmail.current?.value, 
          password: inputPassword.current?.value,
          cpf: inputCpf.current?.value} })
        .then(() => {
          showToastMessage("Cliente adicionado com sucesso!",2);
          refatchUsers() //atualiza a lista de users
        })
        .catch(() => {
          showToastMessage("Falha ao gravar o registro.",4);
        });  
      }
    }
  }

  //
  // HandlerDeleteUser
  //
  const handleDeleteUser = (id: string) => {

    deleteUser({ variables: { id } })
    .then(() => {
      //console.log(response)
      showToastMessage("Cliente apagado com sucesso!",2);
      clearForm()
      refatchUsers() //atualiza a lista de users
    })
    .catch(() => {
      showToastMessage("Erro na tentativa de apagar o registro.",1);
    });
  }

  //
  // HandlerUpdateUser
  //
  const handleUpdateUser = (user: IUser) => {
    console.log("User:",user)
    if (inputName.current) {
      inputName.current.value = user.name;
    }
    if (inputEmail.current) {
      inputEmail.current.value = user.email;
    }
    if (inputPassword.current) {
      inputPassword.current.value = user.password;
    }
    if (inputCpf.current) {
      inputCpf.current.value = user.cpf;
    }
    setNewRec(false)
    setCurrentRec(user.id)
  }

  //
  // clearForm
  //
  const clearForm = () => {
    if (inputName.current) {
      inputName.current.value = "";
    }
    if (inputEmail.current) {
      inputEmail.current.value = "";
    }
    if (inputPassword.current) {
      inputPassword.current.value = "";
    }
    if (inputCpf.current) {
      inputCpf.current.value = "";
    }
    setNewRec(true)
  }

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>Error : {error.message}</p>;

  //console.log(usersData.users);

  return (
    <>
      <div className="container">
        <div>
          <ToastContainer />
        </div>
        <form>
          <h1>
            {newRec ? "Novo Usuário" : "Alterar Usuário"}
          </h1>
          <input placeholder="Nome" name="name" ref={inputName} type="text" />
          <input placeholder="Email" name="email" ref={inputEmail} type="text" />
          <input placeholder="Senha" name="password" ref={inputPassword} type="text" />
          <input placeholder="Cpf" name="cpf" ref={inputCpf} type="text" />
          <div className="cardButton">
            <button type="button" onClick={handleWriteUser} className="btnCadastrar" >
              {newRec ? "Adicionar" : "Alterar"}
            </button>
            <button type="reset" onClick={clearForm} className="btnNovo" >Novo</button> 
          </div>
        </form>

         { usersData.users.map((user: IUser) => (
          <div key={user.id} className="card" onClick={() => handleUpdateUser(user)}>
            <div>
              <p>Nome: <span>{user.name}</span></p>
              <p>Email: <span>{user.email}</span></p>
              {/* <p>Senha: <span>{user.password}</span></p> */}
              <p>Cpf: <span>{user.cpf}</span></p>
            </div>
          <button onClick={() => handleDeleteUser(user.id)}>
            <img src={Trash} /> 
          </button>
        </div>
        )) } 

      </div>
    </>
  );
}

export default Home;
