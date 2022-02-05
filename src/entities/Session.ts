import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne } from 'typeorm';

import User from './User';

@Entity('sessions')
export default class Session extends BaseEntity {
  @PrimaryGeneratedColumn()
    id: number;

  @Column()
    userId: number;

  @Column()
    token: string;

  @ManyToOne(() => User, (u) => u.sessions)
    user: User;
}
