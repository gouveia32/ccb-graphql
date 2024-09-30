import { Field, Float, InputType, ObjectType } from "@nestjs/graphql";
import { User } from "@prisma/client";
import { IsString, IsEmail, Length } from 'class-validator'
import { fromEvent } from "rxjs";
import { Account } from "src/accounts/entities/account.entity";

@InputType('TransactionModelPrisma', { isAbstract: true })
@ObjectType()
export class TransactionModel {
  @Field(type => String)
  id: string

  @Field(type => String)
  fromEvent: string;

  @Field(type => String)
  to: string;

  @Field(type => Float)
  @IsString()
  amount: number

}