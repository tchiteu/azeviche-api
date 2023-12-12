// BaseEntity.ts
import { validate } from 'class-validator';
import {
  BaseEntity as TypeORMBaseEntity,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export abstract class BaseEntity extends TypeORMBaseEntity {
  @PrimaryGeneratedColumn()
    id: number;

  @CreateDateColumn()
    created_at: Date;

  @UpdateDateColumn()
    updated_at: Date;

  async validateProperties() {
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
