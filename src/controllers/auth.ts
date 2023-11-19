import { Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { database } from '../data-source';
import { User } from '../entity/User';
import { comparePassword, createJWT } from '../services/auth';

export const signIn = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await database.findOneBy(User, { email });

  if (user && await comparePassword(password, user.password)) {
    const token = createJWT(user, '5s');
    const refreshToken = createJWT(user, '20s');

    user.refresh_token = refreshToken;

    await database.save(User, user);

    return res.status(200).json({ token, refreshToken });
  }

  res.status(401).json({
    message: 'Wrong email or password',
  });
};

export const generateNewToken = async (req: Request, res: Response) => {
  const { refreshToken } = req.body;

  try {
    const decoded = verify(refreshToken, process.env.JWT_SECRET) as { userId: number };
    const user = await database.findOneBy(User, { id: decoded.userId });

    if (!user || user.refresh_token !== refreshToken) {
      throw new Error('Unauthorized');
    }

    const token = createJWT(user, '20s');
    res.json({ token });
  } catch (error) {
    res.status(401).json({ message: 'Unauthorized' });
  }
};
