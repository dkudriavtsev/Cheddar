/* Generated by Babel */
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var CheddarTokens = (function () {
    function CheddarTokens(tokens) {
        _classCallCheck(this, CheddarTokens);

        if (tokens === null) {
            this.length = -1;
        } else if (Number.isInteger(tokens.length) && tokens.splice) {
            this.length = tokens.length;
            for (var i = 0; i < tokens.length; i++) {
                this[i] = tokens[i];
            }
        } else {
            throw new TypeError("VSLTokens: provided instantiation token is invalid");
        }
    }

    _createClass(CheddarTokens, [{
        key: "UpdateTokends",
        value: function UpdateTokends(tokens) {
            if (tokens === null) {
                this.length = -1;
            } else if (Number.isInteger(tokens.length) && tokens.splice) {
                this.length = tokens.length;
                for (var i = 0; i < tokens.length; i++) {
                    this[i] = tokens[i];
                }
            } else {
                throw new TypeError("VSLTokens: provided update token is invalid");
            }
        }

        // Does nothing ATM
    }, {
        key: "splice",
        value: function splice() {
            return Array;
        }

        //* [Symbol.iterator]() {
        //    for (let i = 0; i < this.length; i++) {
        //        yield this[i];
        //    }
        //    return this;
        //}
    }]);

    return CheddarTokens;
})();

exports["default"] = CheddarTokens;
module.exports = exports["default"];