import { InputType, Int, Field, PickType } from '@nestjs/graphql';
import { User } from '../entities/user.entity';

@InputType()
export class CreateUserInput extends PickType(User, ['name', 'email', 'password']) { 
  @Field(() => String)
  name: string;

  @Field(() => String)
  email: string;
  
  @Field(() => String)
  cpf: string;
  
  @Field(() => String)
  password: string
  
}
