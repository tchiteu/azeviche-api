import {
  Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn,
} from 'typeorm';
import {
  Length, IsEmail, IsStrongPassword, IsBoolean, validate,
} from 'class-validator';
import { Shedule } from './Shedule';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
    id: number;

  @Column()
  @Length(2, 80)
    name: string;

  @Column()
  @IsEmail()
    email: string;

  @Column()
  @IsBoolean()
    manager: boolean;

  @Column()
  @IsStrongPassword()
    password: string;

  @Column()
  @Length(5)
    language: string;

  @Column()
  @CreateDateColumn()
    created_at: Date;

  @Column()
  @UpdateDateColumn()
    updated_at: Date;

  @OneToMany(() => Shedule, (shedule) => shedule.user)
    shedules: Shedule[];

  constructor(name: string, email: string, password: string, manager: boolean, language: string) {
    this.name = name;
    this.email = email;
    this.password = password;
    this.manager = manager;
    this.language = language;
  }

  public async validateProperties() {
    const validateErrors = await validate(this);
    const errors = validateErrors.map((error) => {
      const { constraints, property } = error;

      const keys = Object.keys(constraints);
      const message = constraints[keys[0]];

      return {
        property,
        message,
      };
    });

    return errors;
  }
}
