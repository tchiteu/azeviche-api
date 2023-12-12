import { Column, Entity } from 'typeorm';
import { Length } from 'class-validator';
import { BaseEntity } from './base/BaseEntity';

@Entity()
export class Category extends BaseEntity {
  @Column()
  @Length(4, 60)
    name: string;

  @Column('simple-array', { array: true })
    sizes: string[];

  constructor(name: string, sizes: string[]) {
    super();

    this.name = name;
    this.sizes = sizes;
  }
}
