(function (root, factory) {
    'use strict';
    if (typeof exports === 'object') {
        module.exports = factory();
    } else if (typeof define === 'function' && define.amd) {
        define([], factory);
    } else {
        root.tomlify = factory();
    }
}(this, function () {
    'use strict';

    var defaults = {
        indent: '  ',
        delims: '+++'
    };
    var defaultOpts = {
        indent: false,
        delims: false
    };
    var copyDefaults = function (dest) {
        var prop;
        for (prop in defaultOpts) {
            if (typeof dest[prop] === 'undefined') {
                dest[prop] = defaultOpts[prop];
            } else if (dest[prop] === true && typeof defaults[prop] !== 'undefined') {
                dest[prop] = defaults[prop];
            }
        }
    };

    var Tomler = function (opts) {
        var self = this;
        self.opts = opts;

        var getIndent = function (levels) {
            var ret = '';
            while (levels > 0 && self.opts.indent) {
                ret += self.opts.indent;
                levels -= 1;
            }
            return ret;
        };

        var pad = function (num) {
            if (num < 10) {
                return '0' + num;
            }
            return num.toString();
        };

        var isoDateString = function (date) {
            return date.getUTCFullYear() + '-' +
                    pad(date.getUTCMonth() + 1) + '-' +
                    pad(date.getUTCDate()) + 'T' +
                    pad(date.getUTCHours()) + ':' +
                    pad(date.getUTCMinutes()) + ':' +
                    pad(date.getUTCSeconds()) + 'Z';
        };

        var escapeString = function (str) {
            return str
                .replace(new RegExp('\b', 'g'), '\\b')
                .replace(new RegExp('\t', 'g'), '\\t')
                .replace(new RegExp('\n', 'g'), '\\n')
                .replace(new RegExp('\f', 'g'), '\\f')
                .replace(new RegExp('\r', 'g'), '\\r')
                .replace(new RegExp('\"', 'g'), '\\"');
        };

        var isArray = function (obj) {
            return Object.prototype.toString.call(obj) === '[object Array]';
        };

        var isSimpleType = function (value) {
            var type = typeof value;
            var strType = Object.prototype.toString.call(value);
            return type === 'string' || type === 'number' || type === 'boolean' || strType === '[object Date]' ||
                    (isArray(value) && (value.length === 0 || isSimpleType(value[0])));
        };

        var dumpObject = function (value, context, inArray) {
            var contextName, bracket;
            context = context || [];
            var type = Object.prototype.toString.call(value);
            if (type === '[object Date]') {
                return isoDateString(value);
            } else if (type === '[object Array]' ) {
                if (value.length === 0) {
                    return '[]';
                }
                contextName = '';
                bracket = '';
                if (context.length === 0) {
                    bracket = '[';
                }
                for (var index = 0; index < value.length; index += 1) {
                    bracket += dump(value[index], context, true);
                    if (context.length === 0 ) {
                        bracket += ', ';
                    }
                }
                if (context.length > 0) {
                    return bracket;
                }
                return bracket.substring(0, bracket.length - 2) + ']';
            }

            var result = '', simpleProps = '';
            var propertyName, pret = '', postt = '';

            for (propertyName in value) {
                if (isSimpleType(value[propertyName])) {
                    simpleProps += getIndent(context.length - 1) + propertyName + ' = ' + dump(value[propertyName]) + '\n';
                }
            }

            if (simpleProps) {
                if (context.length > 0) {
                    contextName = context.join('.');
                    if (inArray) {
                        pret = '[';
                        postt = ']';
                    }
                    result += getIndent(context.length - 1) + pret + '[' + contextName + ']' + postt + '\n';
                }
                result += simpleProps;
            }

            for (propertyName in value) {
                if (!isSimpleType(value[propertyName])) {
                    result += dump(value[propertyName], context.concat(propertyName));
                }
            }

            return result;
        };

        var dump = function (value, context, inArray) {
            switch (typeof value) {
                case 'string':
                    return '"' + escapeString(value) + '"';
                case 'number':
                    return '' + value;
                case 'boolean':
                    return value ? 'true' : 'false';
                case 'object':
                    return dumpObject(value, context, inArray);
            }
        };

        this.tomlify = function (obj) {
            var toml = '';
            if (this.opts.delims) {
                toml += this.opts.delims + '\n';
            }
            toml += dump(obj);
            if (this.opts.delims) {
                toml += this.opts.delims;
            } else {
                toml = toml.substring(0, toml.length - 1)
            }
            return toml;
        };

    };

    return function (obj, options) {
        var formatter;
        options = options || {};
        copyDefaults(options);
        formatter = new Tomler(options);
        return formatter.tomlify(obj);
    };
}));
