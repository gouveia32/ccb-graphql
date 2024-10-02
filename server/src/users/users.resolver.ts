import { Args, ID, Int, Mutation, Query, Resolver } from "@nestjs/graphql";
import { UsersService } from './users.service';
import { AuthGuard } from "src/auth/auth.guard";
import { AuthUser } from "src/auth/auth-user.decorator";
import { CreateUserOutput } from "./dto/create-user.output";
import { UserModel } from "./model-user";
import { User } from "@prisma/client";
import { LoginOutput } from "./dto/login.dto";

@Resolver(() => UserModel)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Mutation(() => CreateUserOutput, { name: 'createUser', nullable: true })
  async  createUser(
    @Args('name') name: string,
    @Args('email') email: string,
    @Args('password') password: string,
    @Args('cpf') cpf: string,
  ): Promise<CreateUserOutput> {
    //console.log("resolver:",email)
    return this.usersService.create({ name, email, password, cpf })
  }
  
  @Query(() => [UserModel], { name: 'users', nullable: true })
  async users() {
    const users = await this.usersService.findAll();
    return users;
  }

  @Query(() => UserModel, { name: 'user', nullable: true })
  async user(@Args('id', { type: () => ID }) id: string) {
    const user = await this.usersService.findOne(id);
    return user
  }

  @Mutation(() => UserModel, { name: 'updateUser', nullable: true })
  async updateUser(
    @Args('id') id: string,
    @Args('name') name: string,
    @Args('email') email: string,
    @Args('cpf') cpf: string,
  ): Promise<CreateUserOutput> {
    const user = await this.usersService.update({ id, name, email, cpf });
    return user;
  }

  @Mutation(() => UserModel, { name: 'deleteUser', nullable: true })
  async remove(
    @Args('id') id: string) {
    //console.log("remove:",id)
    return this.usersService.remove(id);
  }

  @Mutation(() => LoginOutput)
  async  login(
    @Args('email') email: string,
    @Args('password') password: string,
  ) {
    return await this.usersService.login({ email, password })
  }

  @Query(() => UserModel)
  //@UseGuards(AuthGuard)
  me(@AuthUser() authUser: AuthGuard) {
    console.log("resolver me:",authUser)
    return authUser
  } 

  @Query(() => UserModel)
  //@UseGuards(AuthGuard)
  async currentUser(obj, args, context, info) {
    const { userId } = context;   // the userID is null
    console.log("userId:",userId)
    return this.usersService.findOne(userId);
  }

  @Query(returns => UserModel)
  //@UseGuards(AuthGuard)
  whoami(@AuthUser() user: UserModel) {
    console.log("logado como:",user);
    return this.usersService.findOne(user.id );
  } 

  @Query(() => UserModel)
  //@UseGuards(GraphqlPassportAuthGuard)
  whoAmI(@AuthUser() user: User) {
    return user;
  }
  

} 
