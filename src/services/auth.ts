import { genSalt, hash, compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { User } from '../entity/User';

export const hashPassword = async (password: string) => {
  const saltRounds = Number(process.env.SALT_ROUNDS);
  const salt = await genSalt(saltRounds);
  const passwordHash = await hash(password, salt);

  return passwordHash;
};

export const comparePassword = async (password: string, passwordHash: string) => {
  const match = await compare(password, passwordHash);

  return match;
};

export const createJWT = (user: User, expiresIn: string) => {
  const payload = {
    id: user.id,
    manager: user.manager,
  };

  const secretKey = process.env.JWT_SECRET;

  return sign(payload, secretKey, { expiresIn });
};
