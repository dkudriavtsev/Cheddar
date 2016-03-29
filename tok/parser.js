/* Generated by Babel */
// Define parser
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _lex = require('./lex');

var _lex2 = _interopRequireDefault(_lex);

var _tks = require('./tks');

var _tks2 = _interopRequireDefault(_tks);

var _chars = require('../chars');

var CheddarParser = (function () {
    function CheddarParser(Code, Index) {
        _classCallCheck(this, CheddarParser);

        this.Code = Code;
        this.Index = Index;

        this._Tokens = [];
    }

    // Parse from tokenized result

    _createClass(CheddarParser, [{
        key: 'parse',
        value: function parse(parseClass) {
            if (parseClass.prototype instanceof _lex2['default']) {
                var _ref;

                for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
                    args[_key - 1] = arguments[_key];
                }

                var Parser = (_ref = new parseClass(this.Code, this.Index)).exec.apply(_ref, args);

                this.Tokens = Parser;
                this.Index = Parser.Index;

                return this;
            } else {
                throw new TypeError('CheddarParser: provided parser is not a CheddarLexer');
            }
        }
    }, {
        key: 'jumpwhite',
        value: function jumpwhite() {
            var WHITESPACE_REGEX = /\s/;
            while (WHITESPACE_REGEX.test(this.Code[this.Index])) this.Index++;
            return this;
        }
    }, {
        key: 'jumpliteral',
        value: function jumpliteral(l) {
            if (this.Code.indexOf(l) === this.Index) this.Index += l.length;else return false;
            return this;
        }
    }, {
        key: 'Tokens',
        get: function get() {
            return new _tks2['default'](this._Tokens);
        },
        set: function set(v) {
            this._Tokens.push(v);
        }
    }]);

    return CheddarParser;
})();

exports['default'] = CheddarParser;
module.exports = exports['default'];