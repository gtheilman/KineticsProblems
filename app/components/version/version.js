'use strict';

angular.module('kinetics-problems.version', [
  'kinetics-problems.version.interpolate-filter',
  'kinetics-problems.version.version-directive'
])

.value('version', '0.1');
