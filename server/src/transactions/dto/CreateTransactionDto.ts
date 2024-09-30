import { Field, Float, ID, InputType } from '@nestjs/graphql';
import { Account } from 'src/accounts/entities/account.entity';
//import { transaction_type } from '@prisma/client';

@InputType()
export class CreateTransactionDTO {
  @Field (() => Account)
  from: Account;

  @Field (() => Account)
  to: Account;
  
  @Field(() => Float)
  amount: number;
 
/*   @Field(() => transaction_type)
  type: string;   */
}