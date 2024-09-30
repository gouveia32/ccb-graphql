import { ObjectType, Field, ID } from '@nestjs/graphql';
import { User } from 'src/users/entities/user.entity';

@ObjectType()
export class Account {
@Field (() => ID)
  id: string;

  @Field (() => User)
  owner: User;

  @Field (() => String)
  ownerName: string;
}
