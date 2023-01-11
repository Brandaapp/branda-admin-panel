import mongoose from 'mongoose';
import { expect } from 'chai';

mongoose.connect('mongodb://localhost:8080', { useNewUrlParser: true, useUnifiedTopology: true });

// need to run this terminal command: mocha --colors --exit ./tests/utils

// will remove this section later
/* eslint-disable no-unused-expressions */
const kittySchema = new mongoose.Schema({
  name: String
});

// describe('Archer tests', () => {
//   it('Correctly gets data from test database', async () => {
const Kitten = mongoose.model('Kitten', kittySchema);
const cat = new Kitten({ name: 'Cat!' });
await cat.save();
const kittens = await Kitten.find();
expect(!!kittens).to.be.true;
//   });
// });

mongoose.disconnect();
