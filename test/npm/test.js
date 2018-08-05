const {expect} = require('chai');
const {getManager, managerType} = require('../../dist/index');

const manager = getManager(managerType.npm);

describe('Npm', function() {
  describe('getMeta()', function() {
    const package = 'eslint';
    const version = '5.3.0';
    it(`should return meta of ${package} v${version}`, function(done) {
      manager.getMeta(package, version).then((result) => {
        expect(result.version).to.equal(version);
        expect(result.name).to.equal(package);
        done();
      });
    });
  });
});