# TOMLify

Like `JSON.stringify()`, this library will let you generate TOML based on a JavaScript object. Can generate TOML v0.2.0 with no dependencies.

## Usage

This module can be used in the browser or by node.js. It is a UMD style module which can be used with AMD (RequireJS, etc.) or normal browser globals (window.tomlify).

Once you have a reference to the module you can do: `tomlify(object, options);` which returns the TOML as a string.

### Options

#### `delims` (`bool`|`string`)

Set this to true to use the default delimiters `+++` to surround your TOML payload. You can also specify a string which is used directly as the delimiter. This can be used if you are adding TOML front matter to a file, for example a content file for a static site generator.

#### `indent` (`bool`|`string`)

Set this to true to have nested objects indented visually with two spaces. You can also specify a string to use as the indent string directly.

### Example

```javascript
var tomlify = require('tomlify');
var myobject = { key: 'value', another: 123 };
var toml = tomlify(myobject, {delims: true});
```

## Plans

* Add command line interface.

Adapted from: https://github.com/alexanderbeletsky/toml-js