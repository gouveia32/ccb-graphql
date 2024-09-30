/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { UpdateUserInput } from './dto/update-user.input';
import { PrismaService } from 'src/prisma/prisma.service';
import { LoginInput, LoginOutput } from './dto/login.dto';
import { Prisma, User } from '@prisma/client';
import { compare, hash } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { CreateUserOutput } from './dto/create-user.output';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  async create({
    name,
    email,
    cpf,
    password,
  }: Prisma.UserCreateInput): Promise<CreateUserOutput> {
    const user = await this.findUserByEmail({ email });
    if (user) {
      throw new Error('Este email já tem taken!');
    }

    const hashedPassword = await hash(password, 10);

    console.log('create:', email, password, hashedPassword);
    const userNovo = await this.prismaService.user.create({
      data: {
        name,
        email,
        cpf,
        password: hashedPassword,
      },
    });

    const resp = await this.prismaService.account.create({
      data: {
        userId: userNovo.id,
        ownerName: userNovo.name,
        balance: 0,
      },
    });

    const token = sign({ id: userNovo.id }, 'hgffgcff6gf@bgfghgcgbf');

    return {
      id: userNovo.id,
      name: userNovo.name,
      email: userNovo.email,
      password: userNovo.password,
      cpf,
      accountId: userNovo.id,
      token,
    };
  }

  async findAll() {
    const users = await this.prismaService.user.findMany();
    return users;
  }

  async findOne(id: string) {
    const user = await this.prismaService.user.findUnique({ where: { id } });
    return user;
  }

  async login({ email, password }: LoginInput): Promise<LoginOutput> {
    const user = await this.findUserByEmail({ email });

    //console.log("login:",user)
    if (!user) {
      throw new Error('O usuário não existe!');
    }
    const isPasswordCorrect = await compare(password, user.password);
    if (!isPasswordCorrect) {
      throw new Error('A senha não está correta!');
    }
    //console.log("id:",user.id)

    const account = await this.findOneAccount(user.id);
    if (!account) throw new Error('Conta não existe');

    const token = sign({ id: user.id }, 'hgffgcff6gf@bgfghgcgbf');
    //console.log("token:",token)
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      accountId: account.id,
      token,
    };
  }

  async findOneAccount(userId: string) {
    const account = await this.prismaService.account.findUnique({
      where: { userId },
    });
    return account;
  }

  async update({
      id,
      name,
      email,
      cpf,
      password,
    }: User): Promise<CreateUserOutput> {
      const token = sign({ id: id }, 'hgffgcff6gf@bgfghgcgbf');
      const user = await this.prismaService.user.update({
          where: { id: id },
          data: { name, email, password, cpf}
      });
      return {
        id: user.id,
        name: user.name,
        email: user.email,
        cpf: user.cpf,
        password: user.password,
        accountId: id,
        token,
      };
  }


  async findUserByEmail({ email }: Prisma.UserWhereUniqueInput): Promise<User> {
    return await this.prismaService.user.findUnique({
      where: {
        email,
      },
    });
  }

  async remove(id: string) {
    console.log("delete:",id)

    const deleteUser = await this.prismaService.user.delete({
      where: {
        id
      }
    })
    console.log("ret:",deleteUser)
    return deleteUser


  }
}
