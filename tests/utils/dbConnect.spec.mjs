/* eslint-disable no-unused-expressions */
import { expect } from 'chai';
import sinon from 'sinon';
import dbConnect from '../../utils/dbConnect.mjs';
import mongoose from 'mongoose';

describe('dbConnect', () => {
  let old, spy;

  before(() => {
    old = mongoose.connect;
    mongoose.connect = function () {
      return {
        connections: [
          {
            readyState: true
          }
        ]
      };
    };
    spy = sinon.spy(mongoose, 'connect');
  });

  after(() => {
    mongoose.connect = old;
  });

  it('connects once successfully, then stores connection', async () => {
    await dbConnect();
    expect(spy.calledOnce).to.be.true;

    await dbConnect();
    expect(spy.calledTwice).to.be.false;
  });
});
