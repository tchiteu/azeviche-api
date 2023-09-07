import { genSalt, hash, compare } from 'bcrypt';
import { sign, verify } from 'jsonwebtoken';
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

export const createJWT = (user: User) => {
  const payload = {
    id: user.id,
    manager: user.manager,
  };

  const options = {
    expiresIn: '8h',
  };

  const secretKey = process.env.JWT_SECRET;

  return sign(payload, secretKey, options);
};

export const validateJWT = (token: string) => {
  const secretKey = process.env.JWT_SECRET;
  const decoded = verify(token, secretKey);

  return decoded;
};
