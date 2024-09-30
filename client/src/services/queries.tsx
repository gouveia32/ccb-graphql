import { gql } from "@apollo/client";

  //Query : Pega todos os usuários
  export const GET_USERS = gql`
    query {
      users {
        id
        name
        email
        cpf
      }
    }
  `;

  //Mutation : Adiciona novo usuário
  export const CREATE_USER = gql`
  mutation CreateUser ($name: String!, $email: String!, $password: String!, $cpf: String!) {
    createUser(
      name: $name,
      email: $email,
      password: $password,
      cpf: $cpf
    ) {
      name
      id
      email
      cpf
      token
      accountId
    }
  }
  `; 

  //Mutation : Altera o usuário
  export const UPDATE_USER = gql`
  mutation UpdateUser ($id: String!, $name: String!, $email: String!, $password: String!, $cpf: String!) {
    updateUser(
      id: $id,
      name: $name,
      email: $email,
      password: $password,
      cpf: $cpf
    ) {
      id
      name
      email
    }
  }
  `; 

export const DELETE_USER = gql`
  mutation($id: String!){
    deleteUser(
      id: $id    
    ) {
      name
    }
  }
`; 