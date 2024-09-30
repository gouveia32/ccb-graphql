import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
//import { UpdateAccountInput } from './dto/update-account.input';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma, Account } from '@prisma/client';
//import { CreateAccountOutput } from './dto/create-account.dto';


@Injectable()
export class AccountsService {
  constructor (private readonly prismaService: PrismaService) {}

  async create(ownerId: string): Promise<Account> {
      const user = await this.findOneUser(ownerId);
      if (!user) throw new Error('User not found');
      
      //console.log("create:",email,password,hashedPassword)
      return await this.prismaService.account.create({
        data: {
          userId: user.id,
          ownerName: user.name,
          balance: 0
        }
      })
      
  } 
  
  async findOneUser(id: string) {
    const user = await this.prismaService.user.findUnique({ where: { id } });
    return user;
  }

  async findAll() {
    //const accounts = (await this.prismaService.account.findMany());
    const accounts = await this.prismaService.account.findMany({
      // Returns all user fields
      include: {
        owner: true,
      },
    })
    //console.log("accounts(service):",accounts)
    return accounts;
  
  }

  async findOne(id: string) {
    const account = await this.prismaService.account.findUnique({ where: { id } });
    return account;
  }

/* 
  async update(data: UpdateAccountInput) {
    const account = await this.prismaService.account.update({
      where: { id: data.id },
      data,
    });
    return account;
  } */


  async remove(id: string) {
    //console.log("delete:",id)
    await this.prismaService.account.delete({ where: { id } });
  }


}
