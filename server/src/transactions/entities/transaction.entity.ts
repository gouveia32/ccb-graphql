import { ObjectType, Field, ID, Float } from '@nestjs/graphql';

@ObjectType()
export class Transaction {
@Field (() => ID)
  id: string;

  @Field (() => String)
  from: string;

  @Field (() => String)
  to: string;

  @Field (() => Float)
  amount: number; 

  @Field({ nullable: true })
  date?: Date

  @Field (() => String)
  type: string; 
}

