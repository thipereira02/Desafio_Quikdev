/* eslint-disable consistent-return */
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany } from 'typeorm';
import bcrypt from 'bcrypt';

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

  static async newUser(name:string, email:string, password:string, username:string, birthdate:string, address:string, addressNumber:string, primaryPhone:string, description:string) {
    const EmailExistsOrUsername = await this.validateDuplicateEmail(email, username);
    if (EmailExistsOrUsername) return false;

    const hashedPassword = this.hashPassword(password);

    const newUser = this.create({ name, email, password: hashedPassword, username, birthdate, address, addressNumber, primaryPhone, description });
    await newUser.save();

    return newUser;
  }

  static async validateDuplicateEmail(email: string, username: string) {
    const checkEmail = await this.findOne({ email });
    const checkUsername = await this.findOne({ username });

    if (checkEmail || checkUsername) {
      return true;
    }
  }

  static async checkUsername(username: string) {
    const user = await this.findOne({ username });

    if (user) {
      return true;
    }
  }

  static hashPassword(password: string) {
    return bcrypt.hashSync(password, 12);
  }

  static async findByEmailAndPassword(email: string, password: string) {
    const user = await this.findOne({ email });

    if (user && bcrypt.compareSync(password, user.password)) {
      return user;
    }

    return false;
  }

  getMainAtributes() {
    return {
      id: this.id,
      email: this.email,
    };
  }
}
