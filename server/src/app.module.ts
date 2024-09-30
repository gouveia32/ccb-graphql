import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { AppController } from './app.controller';
import { GraphqlModule } from './graphql/graphql.module';
import { AccountsModule } from './accounts/accounts.module';
import { Transaction } from './transactions/entities/transaction.entity';
import { TransactionsModule } from './transactions/transactions.module';

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [
    UsersModule,
    AccountsModule,
    TransactionsModule,
    PrismaModule,
    GraphqlModule,
  ],
})

export class AppModule {}
