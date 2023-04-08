/* eslint-disable no-unused-expressions */
import { expect } from 'chai';
import mongoose from 'mongoose';
const kittySchema = new mongoose.Schema({
  name: String
});
const Kitten = mongoose.model('Kitten', kittySchema);

describe('Archer tests', () => {
  it('Correctly gets data from test database', async () => {
    const cat = new Kitten({ name: 'Cat!' });
    await cat.save();
    const kittens = await Kitten.find();
    expect(!!kittens).to.be.true;
  });
});
