/* eslint-disable no-unused-expressions */
import { expect } from 'chai';
import mongoose from 'mongoose';
import fetch from 'node-fetch';

const dburl = 'mongodb://localhost:27017/testing';
const url = 'http://localhost:3000/';

describe('API tests', () => {
  let db;

  beforeEach(async () => {
    // Connect to MongoDB
    mongoose.connect(dburl, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    db = mongoose.connection;

    // Set up test data
    await db.collection('myCollection').insertOne({ name: 'John Doe' });
  });

  afterEach(async () => {
    // Remove test data
    await db.collection('myCollection').deleteMany({});

    // Disconnect from MongoDB
    await db.close();
  });

  it('should create a new user', async () => {
    const data = { username: 'Archer',
      email: 'a@a.gmail.com',
      userType: 'student',
      picture: 'archerpic' };
    const res = await fetch(url + 'api/users/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api_token': '16'
      },
      body: JSON.stringify(data)
    });
    console.log(await res.text());
    console.log("Does console logging work????")
    expect(res.status).to.equal(201);
    expect((await res.json()).username).to.be('Archer');
    const result = await db.collection('User').findOne(data);
    expect(result.name).to.equal(data.name);
  });

  it('should get all users', async () => {
    const data = { name: 'Jane Doe' };
    await db.collection('myCollection').insertOne(data);
    const result = await db.collection('myCollection').findOne(data);
    expect(result).to.deep.equal(data);
  });
});
