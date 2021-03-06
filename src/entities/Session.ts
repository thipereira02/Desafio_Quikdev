import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne } from 'typeorm';
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';

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

  static async generateToken(password: string, userPassword: string) {
    if (bcrypt.compareSync(password, userPassword)) {
      const token = uuidv4();
      return token;
    }
    return false;
  }

  static async createNew(userId: number, token: string) {
    const session = this.create({ userId, token });
    await session.save();
    return session;
  }

  static async findByToken(token: string) {
    const session = await Session.findOne({ where: { token } });
    return session;
  }

  static async deleteSession(token: string) {
    const session = await Session.find({ where: { token } });
    if (session.length === 0) return false;
    await Session.remove(session);
    return true;
  }
}
