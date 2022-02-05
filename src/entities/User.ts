import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany } from 'typeorm';

import Session from './Session';

@Entity('users')
export default class User extends BaseEntity {
  @PrimaryGeneratedColumn()
    id: number;

  @Column()
    name: string;

  @Column()
    email: string;

  @Column()
    password: string;

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

  @OneToMany(() => Session, (s) => s.user)
    sessions: Session[];
}
