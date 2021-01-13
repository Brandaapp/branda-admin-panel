import crypto from 'crypto'

export function checkPassword(password, salt, hash) {
    let key = crypto.pbkdf2Sync(password, salt, 25000, 512, 'sha256')
    return key.toString('hex') === hash
}

export function hashPassword(password) {
    let salt = crypto.randomBytes(32).toString('hex')
    let hash = crypto.pbkdf2Sync(password, salt, 25000, 512, 'sha256')
    return [hash.toString('hex'), salt]
}