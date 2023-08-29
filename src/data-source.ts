import 'reflect-metadata'
import { DataSource } from 'typeorm'
import { User } from './entity/User'
import { Shedule } from './entity/Shedule'

export const AppDataSource = new DataSource({
  type: 'sqlite',
  database: 'database.sqlite',
  synchronize: true,
  logging: false,
  entities: [User, Shedule],
  migrations: [],
  subscribers: [],
})

AppDataSource.initialize();
