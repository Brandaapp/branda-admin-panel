/* eslint-disable no-unused-expressions */
import { expect } from 'chai';
import { checkPassword, hashPassword } from '../../utils/passwordUtils.mjs';

describe('passwordUtils', () => {
  let password, hash, salt;

  beforeEach(() => {
    password = 'password';
    [hash, salt] = hashPassword(password);
  });

  it('correctly identifies correct password', () => {
    const verified = checkPassword(password, salt, hash);

    expect(verified).to.be.true;
  });

  it('correctly identifies incorrect password', () => {
    const badPassword = 'bad';
    const verified = checkPassword(badPassword, salt, hash);

    expect(verified).to.be.false;
  });
});
