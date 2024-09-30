import { Field, InputType, ObjectType, PickType } from "@nestjs/graphql";
import { User } from "../entities/user.entity";

@ObjectType()
export class CreateUserOutput extends PickType(User, ['id', 'name', 'email', 'cpf', 'password']) {
    @Field(() => String)
     token: string

    @Field(() => String)
     accountId?: string
 }