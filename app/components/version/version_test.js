'use strict';

describe('kinetics-problems.version module', function () {
  beforeEach(module('kinetics-problems.version'));

  describe('version service', function() {
    it('should return current version', inject(function(version) {
      expect(version).toEqual('0.1');
    }));
  });
});
