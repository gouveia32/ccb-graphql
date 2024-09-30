import { Field, ID, InputType, ObjectType, PickType } from "@nestjs/graphql";
import { OutputDto } from '../../common/dtos/output.dto';
import { UserModel } from "../model-user";
import { User } from '@prisma/client';
import { User as UserDto } from "../entities/user.entity";


@InputType()
export class LoginInput extends PickType(UserModel, ['email', 'password']) { }

@ObjectType()
//export class LoginOutput extends OutputDto {
  export class LoginOutput {
  @Field(() => String, { nullable: true })
    token?: string

  @Field (() => ID)
    id: string

  @Field(() => String, { nullable: true })
    name: string

  @Field(() => String, { nullable: true })
    email: string

  @Field (() => ID)
    accountId: string

  }

