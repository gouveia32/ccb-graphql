interface User {
    __typename: "User";
    id: string;
}

export interface IAccount {
    __typename: "Account";
    id: string;
    owner: User;
    ownerName: string;
    balance: number;
}

export interface ITransaction {
    __typename: "Transaction";
    id: string;
    date: string;
    type: "Receita" | "Despesa";
    amount: number;
    to: IAccount;
    from: IAccount;
}
