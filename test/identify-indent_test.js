'use strict';

var identifyindent = require('../lib/identify-indent'),
  path = require('path');

function getFixture(fileName) {
  return path.join(__dirname, 'fixtures', fileName);
}

exports.tabs = function(test) {
  var obj = identifyindent.file(getFixture('tabs.js'));

  test.expect(2);

  test.equal(obj.character, '\t', 'found tab for indents');
  test.equal(obj.size, 1, 'found one character per indent');

  test.done();
};

exports.twoSpaces = function(test) {
  var obj = identifyindent.file(getFixture('two-spaces.css'));

  test.expect(2);

  test.equal(obj.character, ' ', 'found space for indents');
  test.equal(obj.size, 2, 'found two characters per indent');

  test.done();
};

exports.mostlyTabs = function(test) {
  var obj = identifyindent.file(getFixture('mostly-tabs.js'));

  test.expect(2);

  test.equal(obj.character, '\t', 'found tab for indents');
  test.equal(obj.size, 1, 'found one character per indent');

  test.done();
};

exports.mostlySpaces = function(test) {
  var obj = identifyindent.file(getFixture('mostly-spaces.js'));

  test.expect(2);

  test.equal(obj.character, ' ', 'found space for indents');
  test.equal(obj.size, 2, 'found two characters per indent');

  test.done();
};
