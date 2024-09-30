import { gql } from '@apollo/client';

// Queries
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

export const GET_ACCOUNTS = gql`
  query {
    accounts {
      id
      owner {
        id
      }
      ownerName
      balance
    }
  }
`;

export const GET_TRANSACTIONS = gql`
  query($accountId: String!) {
    transactions(
      accountId: $accountId,
      filter: "",
    ) {
      id
      date
      amount
      type
      to 
      from
    }
  }
`;

// Mutations
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

export const LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password){
      id
      token
      email
      name
      accountId
    }
  }
`;

export const CREATE_ACCOUNT = gql`
  mutation {
    createAccount(
      ownerId: "string",
    ) {
      id
    }
  }
`;

export const CREATE_TRANSACTION = gql`
  mutation ( $from: String!, $to: String!, $amount: Float! ) {
    createTransaction(
      from: $from,
      to: $to,
      amount: $amount
    ) {
      id
    }
  }
`;