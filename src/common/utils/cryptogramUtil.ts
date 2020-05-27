import * as crypto from 'crypto';

/**
 * 加密密码
 */
export const encryptPassword = (password: string): string => {
  if (!password) {
    return '';
  }
  const md5 = crypto.createHash('md5');
  const newPasswd = md5.update(password).digest('hex');
  return newPasswd;
}