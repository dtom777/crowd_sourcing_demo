import { hash, compare } from 'bcryptjs';
import crypto from 'crypto-js';

export const hashPassword = async (password: string): Promise<string> => {
  const hashedPassword = await hash(password, 12);

  return hashedPassword;
};

export const verifyPassword = async (
  password: string,
  hashedPassword: string
): Promise<boolean> => {
  const isValid = await compare(password, hashedPassword);

  return isValid;
};

export const encryptEmail = (email: string) => {
  return crypto.AES.encrypt(email, 'key');
};

export const decodeEmail = (encryptedEmail: string) => {
  const escapedEmail = encryptedEmail.replace(/ /g, '+');

  return crypto.AES.decrypt(escapedEmail, 'key').toString(crypto.enc.Utf8);
};

// 有効期限1時間
export const getExpires = () => {
  const now = new Date();

  return now.setHours(now.getHours() + 1);
};

export const expiredIsValid = (expires: string): boolean => {
  const now = new Date();

  return Number(expires) > now.setHours(now.getHours());
};
