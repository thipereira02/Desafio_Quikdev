import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';

@Entity('users')
export default class User extends BaseEntity {
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
    primaryPhone: number;

  @Column()
    description: string;

  @Column()
    createdAt: string;
}
