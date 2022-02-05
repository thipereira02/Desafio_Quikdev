import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("users")
export default class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  username: string;

  @Column()
  birthdate: string;

  @Column()
  address: string;

  @Column()
  addressNumber: string;

  @Column()
  primaryPhone: string;

  @Column()
  description: string;

  @Column()
  createdAt: string;
}
