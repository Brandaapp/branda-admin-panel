/* eslint-disable no-unused-expressions */
import { expect } from 'chai';

const { MongoClient } = require('mongodb');
const assert = require('assert');

const url = 'mongodb://localhost:27017';
const dbName = 'testdb';

describe('API tests', () => {
  let client;
  let db;

  beforeEach(async () => {
    // Connect to MongoDB
    client = MongoClient.connect(url, { useUnifiedTopology: true });
    db = client.db(dbName);

    // Set up test data
    await db.collection('myCollection').insertOne({ name: 'John Doe' });
  });

  afterEach(async () => {
    // Remove test data
    await db.collection('myCollection').deleteMany({});

    // Disconnect from MongoDB
    await client.close();
  });

  it('should retrieve data from the database', async () => {
    const result = await db.collection('myCollection').findOne({ name: 'John Doe' });
    expect(result.name).to.equal('John Doe');
  });

  it('should insert data into the database', async () => {
    const data = { name: 'Jane Doe' };
    await db.collection('myCollection').insertOne(data);
    const result = await db.collection('myCollection').findOne(data);
    expect(result).to.deep.equal(data);
  });
});