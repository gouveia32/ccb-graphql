import { InputType, Int, Field, PickType } from '@nestjs/graphql';
import { User } from '../entities/user.entity';

@InputType()
export class UpdateUserInput extends PickType(User, ['name', 'email']) { 
  @Field(() => String)
  id: string;

  @Field(() => String)
  name: string;

  @Field(() => String)
  email: string;
  
  @Field(() => String)
  cpf: string;
  
}
