import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
//import { UpdateTransactionInput } from './dto/update-transaction.input';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma, Transaction } from '@prisma/client';
import { CreateTransactionInput } from './dto/create-transaction.input';
import { CreateTransactionDTO } from './dto/CreateTransactionDto';
import { GraphQLError } from 'graphql';

@Injectable()
export class TransactionsService {
  constructor (private readonly prismaService: PrismaService) {}
  async create({ from, to, amount }: CreateTransactionInput): Promise<Transaction> {

      //console.log("create:",from,to,amount)

      if (amount < 1) {
        //throw new Error('Não tem saldo suficiente!'); 
        throw new GraphQLError("O valor deve ser marior que zero!!.", {
         extensions: { code: '2020' },
       });
     }

      //Atualizar a conta
      if (from == to) {
        //Criar a transação
        const transaction = await this.prismaService.transaction.create({
          data: {
            from,
            to,
            amount,
            type: "Receita"
          }
        }) 
        try{
          const conta = await this.prismaService.account.updateMany({
            where: { id: from },
            data: {balance: {increment: amount}}
          });
          //console.log("Conta atualizada:",conta, from)
        } catch (error) {
          console.log("Erro ao atualizar o balanço")
        }
        return transaction
        
      } else {
        //testa se tem fundo
        const balance = (await this.prismaService.account.findUnique({ where: { id: from } })).balance;
        if (amount > balance) {
           //throw new Error('Não tem saldo suficiente!'); 
           throw new GraphQLError("Saldo insuficiente.", {
            extensions: { code: '2222' },
          });
        }
        if (amount > balance) {
           //throw new Error('Não tem saldo suficiente!'); 
           throw new GraphQLError("Saldo insuficiente.", {
            extensions: { code: '2222' },
          });
        }

        console.log("balance",balance,amount)
        //Criar a transação
        const transaction = await this.prismaService.transaction.create({
          data: {
            from,
            to,
            amount,
            type: "Despesa",
          }
        })         
        //deposita no destino
        await this.prismaService.account.updateMany({
          where: { id: to },
          data: {balance: {increment: amount}}
        })
        //retira da origem
        const account = await this.prismaService.account.updateMany({
          where: { id: from },
          data: {balance: {decrement: amount}}
        })

       // console.log("valor tranferido:",from, to)
        return transaction
      }
  } 
  
  async findOneTransaction(id: string) {
    const transaction = await this.prismaService.transaction.findUnique({ where: { id } });
    return transaction;
  }

  async findByAccountId(accountId: string, filter: string) {
    //const transactions = (await this.prismaService.transaction.findMany());
    console.log("filter:",filter)
    const transactions = await this.prismaService.transaction.findMany({
      where: {
        OR: [
          {from: accountId},
          {to: accountId} 
        ]
      }
     });
    //console.log("transactions(service):",transactions)
    return transactions;
  }

  async findOne(id: string) {
    const transaction = await this.prismaService.transaction.findUnique({ where: { id } });
    return transaction;
  }

  async remove(id: string) {
    //console.log("delete:",id)
    await this.prismaService.transaction.delete({ where: { id } });
  }

  
}
