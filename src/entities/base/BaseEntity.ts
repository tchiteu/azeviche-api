import { validate } from 'class-validator';
import {
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  Entity,
} from 'typeorm';

@Entity()
export class BaseEntity {
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
