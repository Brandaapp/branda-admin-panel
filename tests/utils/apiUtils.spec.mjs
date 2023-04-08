/* eslint-disable no-unused-expressions */
import { expect } from 'chai';
import mongoose from 'mongoose';

const url = process.env.ADMIN_PANEL_DATABASE_URL;

describe('API tests', () => {
  let client;
  let db;

  beforeEach(async () => {
    // Connect to MongoDB
    mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    db = mongoose.connection

    // Set up test data
    await db.collection('myCollection').insertOne({ name: 'John Doe' });
  });

  afterEach(async () => {
    // Remove test data
    await db.collection('myCollection').deleteMany({});

    // Disconnect from MongoDB
    await db.close();
  });

  it('should retrieve data from the database', async () => {
    const data = { name: 'John Doe' }
    const result = await db.collection('myCollection').findOne(data);
    expect(result.name).to.equal(data.name);
  });

  it('should insert data into the database', async () => {
    const data = { name: 'Jane Doe' };
    await db.collection('myCollection').insertOne(data);
    const result = await db.collection('myCollection').findOne(data);
    expect(result).to.deep.equal(data);
  });
});