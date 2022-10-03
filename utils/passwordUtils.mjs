import crypto from 'crypto';

export function checkPassword (password, salt, hash) {
  const key = crypto.pbkdf2Sync(password, salt, 25000, 512, 'sha256');
  return key.toString('hex') === hash;
}

export function hashPassword (password) {
  const salt = crypto.randomBytes(32).toString('hex');
  const hash = crypto.pbkdf2Sync(password, salt, 25000, 512, 'sha256');
  return [hash.toString('hex'), salt];
}
