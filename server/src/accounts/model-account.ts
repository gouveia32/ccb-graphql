import { Field, Float, InputType, ObjectType } from "@nestjs/graphql";
import { User } from "@prisma/client";
import { User as UserModel } from "../users/entities/user.entity";
import { IsString, IsEmail, Length } from 'class-validator'

@InputType('AccountModelPrisma', { isAbstract: true })
@ObjectType()
export class AccountModel {
  @Field(type => String)
  id: string

  @Field(type => Float)
  @IsString()
  balance: number

  @Field(type => UserModel)
  owner: User

  @Field(type => String)
  @IsString()
  ownerName: string

}