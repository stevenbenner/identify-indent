/*
 * identify-indent
 * https://github.com/stevenbenner/identify-indent
 *
 * Copyright (c) 2013 Steven Benner
 * Licensed under the MIT license.
 */

'use strict';

var fs = require('fs');

// constants
var C_COMMENTS_REGEX = /(\/\*([^*]|[\r\n]|(\*+([^*\/]|[\r\n])))*\*+\/)|(\/\/.*)/g,
  EMPTY_LINE_REGEX = /^\s$/,
  LEADING_WHITE_REGEX = /^[ \t]+/;

// main function
exports.string = function(sorceCode) {

  var linesWithTabs = 0,
    linesWithSpaces = 0,
    linesWithBoth = 0,
    shorestWhite = Infinity,
    white = [];

  function getCertainty() {
    var evenMods = 0;
    white.forEach(function(obj) {
      if (obj.str.length % shorestWhite === 0) {
        evenMods++;
      }
    });
    return evenMods / white.length;
  }

  function getRetObj(character) {
    return {
      character: character,
      size: shorestWhite,
      certainty: getCertainty()
    };
  }

  function guessIndent() {
    if (linesWithTabs > linesWithSpaces) {
      return getRetObj('\t');
    } else if (linesWithSpaces > linesWithTabs) {
      return getRetObj(' ');
    }
  }

  // remove comments
  sorceCode = sorceCode.replace(C_COMMENTS_REGEX, '');

  // walk lines
  sorceCode.split(/\r\n?|\n/).forEach(function(line) {

    // skip empty lines
    if (line.match(EMPTY_LINE_REGEX)) {
      return;
    }

    // find leading whitespace
    var match = line.match(LEADING_WHITE_REGEX);

    if (match) {
      var whiteString = match[0];

      if (whiteString.length < shorestWhite) {
        shorestWhite = whiteString.length;
      }

      var hasTabs = whiteString.indexOf('\t') !== -1,
        hasSpaces = whiteString.indexOf(' ') !== -1;

      if (hasTabs && !hasSpaces) {
        linesWithTabs++;
      } else if (hasSpaces && !hasTabs) {
        linesWithSpaces++;
      } else if (hasTabs && hasSpaces) {
        linesWithBoth++;
      }

      white.push({
        str: whiteString,
        hasTabs: hasTabs,
        hasSpaces: hasSpaces
      });
    }

  });

  if (linesWithTabs && !linesWithSpaces) {
    // only found tabs
    return getRetObj('\t');
  } else if (linesWithSpaces && !linesWithTabs) {
    // only found spaces
    return getRetObj(' ');
  } else if ((linesWithTabs && linesWithSpaces) || linesWithBoth) {
    // found both tabs and spaces - this calls for algorithmic guesstification
    return guessIndent();
  } else {
    // didn't find any whitespace indentation
    return null;
  }

};

// file loader function
exports.file = function(filePath) {
  return exports.string(fs.readFileSync(filePath).toString());
};
