# Identify Indent

A Node.js library that determines the type of indentation used in source code.

[![Build Status](https://travis-ci.org/stevenbenner/identify-indent.png)](https://travis-ci.org/stevenbenner/identify-indent)

## Overview

If you need to programmatically figure out if a piece of code uses tabs or spaces (and how many spaces) to indent lines then Identify Indent is here to help. Just pass the code in question or the path to the file and Identify Indent will try to detect what indentation convention it is using.

This library is designed to be make generic observations that should work for any programming language.

## Usage

### Functions

This library exposes two functions that process code and return an object with indent information.

* `string(sourceCode)` - This function accepts a string with the code to process.
* `file(filePath)` - This function accepts a path to a file to process.

### Return value

Both functions return an object with the following properties:

* `character` - The character used for indentation, this will either be a tab character (`'\t'`) or a space character (`' '`).
* `size` - The number of characters in an indent.
* `certainty` - How sure the library is that these values are correct.

For example, an object for a file that uses two spaces for indents will look like this:

```javascript
{
  character: ' ',
  size: 2,
  certainty: 1
}
```

If there was no leading whitespace to determine what indent convention is used then the function will return `null`.

## Examples

### Process a file

```javascript
var identifyindent = require('identify-indent');

// get info about myscript.js
var indentInfo = identifyindent.file('path/to/myscript.js');
```

### Process a string

```javascript
var identifyindent = require('identify-indent');

// get info about the source code in the code variable
var indentInfo = identifyindent.string(code);
```

## Release History

*(Nothing Yet)*

## License

*(This project is released under the [MIT license](https://raw.github.com/stevenbenner/identify-indent/master/LICENSE.txt).)*

Copyright (c) 2013 Steven Benner (http://stevenbenner.com/)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
