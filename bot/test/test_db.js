const sinon = require('sinon');
const { listApps, addApp, rmApp, subscribeToApp, unsubscribeToApp, listSubscriptions, etcd} = require('../src/db');
var chai = require("chai");
var chaiAsPromised = require("chai-as-promised");

chai.use(chaiAsPromised);
 
// Then either:
var expect = chai.expect;
// or:
var assert = chai.assert;

chai.should();

describe('Testing db handles', () => {
  afterEach(function() {
    rmApp("teste1");
    rmApp("teste2");
    rmApp("teste3");
    rmApp("teste4");
  });
  describe('addApp', async () => {
    it('should not return exception', async () => {
      return Promise.resolve(addApp(`teste1`, `http://teste.com`)).should.be.fulfilled;
      
    });
  });
  describe('addApp error', async () => {
    it('should return an exception', async () => {
      await addApp(`teste2`, `http://teste.com`);
      return Promise.resolve(addApp(`teste2`, `http://teste.com`)).should.rejectedWith(Error);
    });
  });
  describe('subscribeToApp', async () => {
    it('should not return exception', async () => {
      return Promise.resolve(subscribeToApp(`teste`, `12214545`)).should.be.fulfilled;
    });
  });
  describe('subscribeToApp', async () => {
    it('should return chatIds from subscriptions', async () => {
      return assert.eventually.equal(Promise.resolve(listSubscriptions("teste")), '12214545');
      // return Promise.resolve(listSubscriptions("teste")).should.eventually.equal(['12214545']);
    });
  });
  describe('unsubscribeToApp', async () => {
    it('should not return exception', async () => {
      return Promise.resolve(unsubscribeToApp(`teste`, `12214545`)).should.be.fulfilled;
    });
  });
  describe('rmApp', async () => {
    it('should exclude the app', async () => {
      return Promise.resolve(rmApp(`teste`)).should.be.fulfilled;
    });
  });
  describe('listApps', async () => {
    it('should list the apps', async () => {
      await addApp(`teste3`, `http://teste.com`);
      return assert.eventually.equal(listApps(), 'teste3');
      // return Promise.resolve(listApps()).should.eventually.equal([ 'teste' ]);
    });
  });
  describe('listApps error', async () => {
    it('should not list empty app name', async () => {
      await addApp(`teste4`, `http://teste.com`);
      await addApp(``, ``);
      return assert.eventually.equal(listApps(), 'teste4');
      // return Promise.resolve(listApps()).should.eventually.equal([ 'teste' ]);
    });
  });
});