import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm'
import { User } from './User'

@Entity()
export class Shedule {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  clockIn: Date

  @Column({ nullable: true })
  clockOut: Date

  @ManyToOne(() => User, (user) => user.shedules)
  user: User
}