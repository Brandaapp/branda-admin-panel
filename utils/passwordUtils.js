import crypto from 'crypto';

export function checkPassword(password, salt, hash) {
    let key = crypto.pbkdf2Sync(password, salt, 25000, 512, 'sha256');
    return key.toString('hex') === hash;
}