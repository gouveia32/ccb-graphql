import { Field, InputType, ObjectType, PickType } from "@nestjs/graphql";
import { OutputDto } from "src/common/dtos/output.dto";
import { User } from "../entities/user.entity";

/* @InputType()
export class CreateUserInput extends PickType(User, ['name', 'email', 'password']) { }
 */
@ObjectType()
export class CreateUserOutput extends PickType(User, ['id', 'name', 'email', 'password']) {
    @Field(() => String, { nullable: true })
     token?: string

     @Field(() => String, { nullable: true })
     accountId?: string
    
 }