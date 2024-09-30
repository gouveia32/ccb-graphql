import { Args, ID, Mutation, Query, Resolver } from "@nestjs/graphql";
import { AccountsService } from './accounts.service';

import { AccountModel } from "./model-account";

//import { UpdateAccountInput } from "./dto/update-account.input";
import { CreateUserOutput } from "src/users/dto/create-user.output";

@Resolver(() => AccountModel)
export class AccountsResolver {
  constructor(private readonly accountsService: AccountsService) {}

  @Mutation(() => AccountModel, { name: 'createAccount', nullable: true })
  createAccount(@Args('ownerId', { type: () => String }) ownerId: string) {
    console.log("resolver:",ownerId)
    return this.accountsService.create( ownerId )
  }
  
  @Query(() => [AccountModel], { name: 'accounts', nullable: true })
  async accounts() {
    const accounts = await this.accountsService.findAll();
    //console.log("accounts(resolver):",accounts)
    return accounts;
  }

  @Query(() => AccountModel, { name: 'account', nullable: true })
  async account(@Args('id', { type: () => ID }) id: string) {
    const account = await this.accountsService.findOne(id);
    return account
  }

/*   @Mutation(() => AccountModel, { name: 'updateAccount', nullable: true })
  async update(@Args('data') data: UpdateAccountInput) {
    const account = await this.accountsService.update(data);
    return account;
  } */

  @Mutation(() => AccountModel, { name: 'deleteAccount', nullable: true })
  async remove(@Args('id', { type: () => ID }) id: string) {
    //console.log("remove:",id)
    return this.accountsService.remove(id);
  }


} 
