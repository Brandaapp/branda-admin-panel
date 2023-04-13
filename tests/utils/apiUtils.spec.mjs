/* eslint-disable no-unused-expressions */
import { expect } from 'chai';
import mongoose from 'mongoose';
import fetch from 'node-fetch';

const dburl = process.env.ADMIN_PANEL_DATABASE_URL || 'mongodb://localhost:27017/testing';
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
    await db.collection('User').deleteMany({});

    // Disconnect from MongoDB
    await db.close();
  });

  it('should create a new user', async () => {
    const data = { username: 'Archer',
      email: 'a@a.gmail.com',
      password: 'password',
      userType: 'student',
      picture: 'archerpic' };
    const res = await fetch(url + 'api/users/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api_token': process.env.API_TOKEN || process.env.API_TOKEN_SECRET
      },
      body: JSON.stringify(data)
    });
    expect(res.status).to.equal(200);
    expect((await res.json()).username).to.equal('Archer');
    const result = await db.collection('User').findOne({ username: 'Archer' });
    expect(result.username).to.equal(data.username);
  });

  it('should get all users', async () => {
    const data = { name: 'Jane Doe' };
    await db.collection('myCollection').insertOne(data);
    const result = await db.collection('myCollection').findOne(data);
    expect(result).to.deep.equal(data);
  });
});
