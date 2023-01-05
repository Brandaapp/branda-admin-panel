import dbConnect from "../utils/dbConnect.mjs"

import mongoose from "mongoose"
const Schema = mongoose.Schema;

const kittySchema = new mongoose.Schema({
    name: String
  });

async function tests() {
  await dbConnect(true)
  const Kitten = mongoose.model('Kitten', kittySchema);
  const cat = new Kitten({ name: 'Cat!' });
  await cat.save();
  const kittens = await Kitten.find();
  console.log(kittens);

  // RUN TESTS

  mongoose.connection.close()
}

tests()