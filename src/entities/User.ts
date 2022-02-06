/* eslint-disable consistent-return */
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany, Not } from 'typeorm';
import bcrypt from 'bcrypt';

import Session from './Session';
import UpdateData from '../interfaces/update';

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

  static async getUserById(id: number) {
    const user = await this.findOne({ id });
    return user;
  }

  static async ableToUpdate(id:number, email: string, username: string) {
    const able = await this.find({
      where: [
        { email, id: Not(id) },
        { username, id: Not(id) },
      ],
    });
    if (able.length === 0) return true;
    return false;
  }

  static async updateData(id: number, userData: UpdateData) {
    await this
      .createQueryBuilder()
      .update(User)
      .set(userData)
      .where({ id })
      .execute();
  }

  getMainAtributes() {
    return {
      id: this.id,
      email: this.email,
    };
  }
}
