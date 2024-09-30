import { Field, Float, InputType, Int } from '@nestjs/graphql';
import { transaction_type } from '@prisma/client';
import { IsEmail, IsNotEmpty, MaxLength, MinLength } from 'class-validator';

@InputType()
export class CreateTransactionInput {

  @Field (() => String)
  from: string;

  @Field (() => String)
  to: string;
  
  @Field(() => Float)
  amount: number;

  @Field({ nullable: true })
  date?: Date
/* 
  @Field (() => transaction_type)
  type: transaction_type;
 */
}
