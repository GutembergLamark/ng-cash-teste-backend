import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";

import { Account } from "./account.entity";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn("uuid")
  readonly id!: string;

  @Column({ unique: true })
  username!: string;

  @Column()
  password?: string;

  @OneToOne(() => Account)
  @JoinColumn()
  account!: Account;
}
