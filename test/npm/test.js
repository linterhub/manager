const {expect} = require('chai');
const {getManager, managerType} = require('../../src/index');

const manager = getManager(managerType.npm);

describe('Npm', function() {

  const package = 'eslint';
  const version = '5.3.0';

  describe('getMeta()', function() {
    it(`should return meta of ${package} v${version}`, (done) => {
      manager.getMeta(package, version).then((result) => {
        expect(result.version).to.equal(version);
        expect(result.name).to.equal(package);
        done();
      });
    });
  });
});