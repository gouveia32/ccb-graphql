import { Args, ID, Mutation, Query, Resolver } from "@nestjs/graphql";
import { TransactionsService } from './transactions.service';

import { TransactionModel } from "./model-transaction";

//import { UpdateTransactionInput } from "./dto/update-transaction.input";
import { CreateTransactionDTO } from "./dto/CreateTransactionDto";
import { Prisma, transaction_type } from "@prisma/client";
import { Transaction } from "./entities/transaction.entity";

@Resolver(() => TransactionModel)
export class TransactionsResolver {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Mutation(() => Transaction, { name: 'createTransaction' })
  async  create(
    @Args('from') from: string,
    @Args('to') to: string,
    @Args('amount') amount: number,
  ) {
    //console.log("resolver:",from, to, amount)
    return this.transactionsService.create({ from, to, amount })
  }
 
  @Query(() => [Transaction], { name: 'transactions', nullable: true })
  async transactions(
    @Args('accountId') accountId: string,
    @Args('filter') filter?: string,
  ) {
    const transactions = await this.transactionsService.findByAccountId(accountId,filter);
    //console.log("transactions(resolver):",transactions)
    return transactions;
  }

  @Query(() => Transaction, { name: 'transaction', nullable: true })
  async transaction(@Args('id', { type: () => ID }) id: string) {
    const transaction = await this.transactionsService.findOne(id);
    return transaction
  }

  @Mutation(() => Transaction, { name: 'deleteTransaction', nullable: true })
  async remove(@Args('id', { type: () => ID }) id: string) {
    //console.log("remove:",id)
    return this.transactionsService.remove(id);
  }


} 
