import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Account } from "./account.entity";

@Entity("transactions")
export class Transaction {
  @PrimaryGeneratedColumn("uuid")
  readonly id!: string;

  @ManyToOne(() => Account, (account) => account.debitedTransactions)
  debitedAccount?: Account;

  @ManyToOne(() => Account, (account) => account.creditedTransactions)
  creditedAccount?: Account;

  @Column("decimal", { precision: 8, scale: 2 })
  value!: number;

  @CreateDateColumn()
  createdAt!: Date;
}
