import { Request, Response } from 'express'
import { User } from '../entity/User'
import { AppDataSource } from '../data-source'

export const list = async (req: Request, res: Response) => {
  try {
    const users = await AppDataSource.manager.find(User)

    console.log(users)
  } catch (err) {
    console.log(err)
  }
};