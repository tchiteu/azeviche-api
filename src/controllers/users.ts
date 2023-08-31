import { Request, Response } from 'express';
import { User } from '../entity/User';
import { database } from '../data-source';

export const create = async (req: Request, res: Response) => {
  const {
    name, email, password, language,
  } = req.body;
  const user = new User(name, email, password, language);

  // validate body fields/properties
  const errors = await user.validateProperties();

  if (errors.length > 0) {
    res.status(400).json(errors[0]);
  }

  const existingUser = await database.findOne(User, {
    where: { email: user.email },
  });

  // check if email already exists
  if (existingUser) {
    res.status(409).json({
      field: 'email',
      message: 'email is already in use',
    });
  }

  // insert user into database
  database.save(User, user);
};
