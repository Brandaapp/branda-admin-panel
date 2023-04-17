/* eslint-disable no-unused-expressions */
import { expect } from 'chai';
import mongoose from 'mongoose';
import fetch from 'node-fetch';

const dburl = process.env.ADMIN_PANEL_DATABASE_URL || 'mongodb://localhost:27017/testing';
const url = process.env.APP_URL || 'http://localhost:3000/';

describe('API tests', () => {
  let db;

  beforeEach(async () => {
    // Connect to MongoDB
    await mongoose.connect(dburl, {
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
    await db.collection('users').deleteMany({});

    // Disconnect from MongoDB
    await db.close();
  });

  it('should check if server is running', async () => {
    const res = await fetch(url);
    expect(res.status).to.equal(200);
  });

  it('should create a new user and as the first test, will take a hot second', async () => {
    const data = { username: 'Archer',
      email: 'a@a.gmail.com',
      password: 'password',
      userType: 'student',
      picture: 'archerpic' };
    const res = await fetch(url + 'api/users/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api_token': process.env.API_TOKEN_SECRET
      },
      body: JSON.stringify(data)
    });
    // TODO: Must fix to expect 201 and must fix pages/
    expect(res.status).to.equal(200);
    expect((await res.json()).username).to.equal('Archer');
    const result = await db.collection('users').findOne({ username: 'Archer' });
    expect(result.username).to.equal(data.username);
    expect(result.userType).to.equal(data.userType);
    expect(result.picture).to.equal(data.picture);
  });
  it('should create a new user but will take a lot less time', async () => {
    const data = { username: 'Archer',
      email: 'a@a.gmail.com',
      password: 'password',
      userType: 'student',
      picture: 'archerpic' };
    const res = await fetch(url + 'api/users/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api_token': process.env.API_TOKEN_SECRET
      },
      body: JSON.stringify(data)
    });
    // TODO: Must fix to expect 201 and must fix pages/
    expect(res.status).to.equal(200);
    expect((await res.json()).username).to.equal('Archer');
    const result = await db.collection('users').findOne({ username: 'Archer' });
    expect(result.username).to.equal(data.username);
    expect(result.userType).to.equal(data.userType);
    expect(result.picture).to.equal(data.picture);
  });

  it('confirms we can query from the database', async () => {
    const data = { name: 'Jane Doe' };
    await db.collection('myCollection').insertOne(data);
    const result = await db.collection('myCollection').findOne(data);
    expect(result).to.deep.equal(data);
  });
});
