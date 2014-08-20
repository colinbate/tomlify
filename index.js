(function (root, factory) {
    if (typeof exports === 'object') {
        module.exports = factory();
    } else if (typeof define === 'function' && define.amd) {
        define([], factory);
    } else {
        root.tomlify = factory();
    }
}(this, function () {
    'use strict';

    var escapeString = function(str) {
        return str
            .replace(/\b/g, '\\b')
            .replace(/\t/g, '\\t')
            .replace(/\n/g, '\\n')
            .replace(/\f/g, '\\f')
            .replace(/\r/g, '\\r')
            .replace(/\"/g, '\\"');
    };

    var isSimpleType = function(value){
        var type = typeof value;
        var strType = Object.prototype.toString.call(value);
        return type === 'string' || type === 'number' || type === 'boolean' || strType === '[object Date]' || strType === '[object Array]';
    };

    var dumpObject = function(value, context) {
        context = context || [];
        var type = Object.prototype.toString.call(value);
        if(type === '[object Date]') {
            return value.toISOString();
        } else if(type === '[object Array]' ) {
            if(value.length === 0) {
                return null;
            }
            var bracket = '[';
            for (var index = 0; index < value.length; ++index) {
               bracket += dump(value[index]) + ', ';
            }
            return bracket.substring(0, bracket.length - 2) + ']';
        }

        var result = '', simleProps = '';
        var propertyName;

        for(propertyName in value) {
            if(isSimpleType(value[propertyName])){
                simleProps += propertyName + ' = ' + dump(value[propertyName]) + '\n';
            }
        }

        if(simleProps){
            if(context.length > 0){
               var contextName = context.join('.');
               result += '[' + contextName + ']\n';
            }
            result += simleProps + '\n';
        }

        for(propertyName in value) {
            if(!isSimpleType(value[propertyName])){
                result += dump(value[propertyName], context.concat(propertyName));
            }
        }

        return result;
    };

    var dump = function(value, context) {
        switch (typeof value) {
            case 'string':
                return '"' + escapeString(value) + '"';
            case 'number':
                return '' + value;
            case 'boolean':
                return value ? 'true' : 'false';
            case 'object':
                return dumpObject(value, context);
        }
    };

    return dump;
});
