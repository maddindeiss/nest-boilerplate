import { Entity, Column, OneToMany } from 'typeorm';
import { Expose } from 'class-transformer';

import { EntityAbstract } from '../models/entity.abstract';

@Entity('user')
export class User extends EntityAbstract {
  private _firstname?: string;
  private _lastname: string;
  private _title?: string;
  private _gender: string;
  private _email: string;
  private _username: string;
  private _password?: string;
  private _salt?: string;

  constructor() {
    super();
  }

  @Column({ name: 'firstname', type: 'varchar', length: 255, nullable: true })
  @Expose({ name: 'firstname' })
  get firstname(): string { return this._firstname; }
  set firstname(value: string) { this._firstname = value; }

  @Column({ name: 'lastname', type: 'varchar', length: 255 })
  @Expose({ name: 'lastname' })
  get lastname(): string { return this._lastname; }
  set lastname(value: string) { this._lastname = value; }

  @Column({ name: 'title', type: 'varchar', length: 100, nullable: true })
  @Expose({ name: 'title' })
  get title(): string { return this._title; }
  set title(value: string) { this._title = value; }

  @Column({ name: 'gender', type: 'varchar', length: 1 })
  @Expose({ name: 'gender' })
  get gender(): string { return this._gender; }
  set gender(value: string) { this._gender = value; }

  @Column({ name: 'email', type: 'varchar', length: 255 })
  @Expose({ name: 'email' })
  get email(): string { return this._email; }
  set email(value: string) { this._email = value; }

  @Column({ name: 'username', type: 'varchar', length: 255 })
  @Expose({ name: 'username' })
  get username(): string { return this._username; }
  set username(value: string) { this._username = value; }

  @Column({ name: 'password', type: 'varchar', length: 255, nullable: true })
  @Expose({ name: 'password' })
  get password(): string { return this._password; }
  set password(value: string) { this._password = value; }

  @Column({ name: 'salt', type: 'varchar', length: 255, nullable: true })
  @Expose({ name: 'salt' })
  get salt(): string { return this._salt; }
  set salt(value: string) { this._salt = value; }
}
