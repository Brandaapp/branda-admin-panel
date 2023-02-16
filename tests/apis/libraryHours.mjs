import { expect } from 'chai';
import fetch from 'node-fetch';

describe('fetch library hours', () => {
  let res;
  before(async () => {
    res = await fetch('http://localhost:3000/api/getinfo/libraryHours/today', { method: 'post' });
  });

  describe('today', async () => {
    it('returns status 405', () => {
      expect(res.status).to.equal(405);
    });
  });
});
