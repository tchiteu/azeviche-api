import { Request, Response } from 'express';
import { User } from '../entity/User';
import { database } from '../data-source';
import { hashPassword } from '../services/auth';

export const create = async (req: Request, res: Response) => {
  const {
    name, email, password, manager, language,
  } = req.body;

  const user = new User(name, email, password, manager, language);

  // validate body fields/properties
  const errors = await user.validateProperties();

  if (errors.length > 0) {
    return res.status(400).json(errors[0]);
  }

  const existingUser = await database.findOne(User, {
    where: { email: user.email },
  });

  // check if email already exists
  if (existingUser) {
    return res.status(409).json({
      field: 'email',
      message: 'email is already in use',
    });
  }

  const hash = await hashPassword(user.password);
  user.password = hash;

  // insert user into database
  const createdUser = await database.save(User, user);

  return createdUser;
};
