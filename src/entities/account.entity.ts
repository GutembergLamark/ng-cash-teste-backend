import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Transaction } from "./transaction.entity";

@Entity("accounts")
export class Account {
  @PrimaryGeneratedColumn("uuid")
  readonly id!: string;

  @Column()
  balance!: number;

  @OneToMany(() => Transaction, (transaction) => transaction.creditedAccount, {
    eager: true,
  })
  creditedTransactions?: Transaction[];

  @OneToMany(() => Transaction, (transaction) => transaction.debitedAccount, {
    eager: true,
  })
  debitedTransactions?: Transaction[];
}
