"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.array.reduce");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.keys");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.for-each");

require("core-js/modules/es6.promise");

require("regenerator-runtime/runtime");

require("core-js/modules/es6.function.name");

var _dec, _dec2, _dec3, _dec4, _class, _class2, _init, _init2, _class3, _temp;

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object['ke' + 'ys'](descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object['define' + 'Property'](target, property, desc); desc = null; } return desc; }

var Test = (_dec = isTestable(true), _dec2 = enumerable(false), _dec3 = enumerable(false), _dec4 = enumerable(false), _dec(_class = (_class2 = (_temp = _class3 =
/*#__PURE__*/
function () {
  function Test(name) {
    _classCallCheck(this, Test);

    this.work1 = function () {
      // object rest & spread
      (function (a, b) {
        for (var _len = arguments.length, c = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
          c[_key - 2] = arguments[_key];
        }

        console.log(a, b, c);
      })(1, 2, 3, 4, 5);
    };

    this.name = name;
  }

  _createClass(Test, [{
    key: "showName",
    value: function showName() {
      console.log('My name is ' + this.name);
    }
  }, {
    key: "work2",
    value: function () {
      var _work = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                console.log('begin work1');
                _context.next = 3;
                return new Promise(function (resolve) {
                  setTimeout(resolve, 300);
                });

              case 3:
                console.log('done work1');

              case 4:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function work2() {
        return _work.apply(this, arguments);
      }

      return work2;
    }()
  }, {
    key: "work3",
    value:
    /*#__PURE__*/
    regeneratorRuntime.mark(function work3() {
      return regeneratorRuntime.wrap(function work3$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              console.log('begin work2');
              _context2.next = 3;
              return new Promise(function (resolve) {
                setTimeout(resolve, 300);
              });

            case 3:
              console.log('done work2');
              _context2.next = 6;
              return;

            case 6:
            case "end":
              return _context2.stop();
          }
        }
      }, work3, this);
    })
  }]);

  return Test;
}(), _class3.props = 'static props', _class3.create = function (name) {
  return new Test(name);
}, _temp), (_applyDecoratedDescriptor(_class2, "props", [_dec2], (_init = Object.getOwnPropertyDescriptor(_class2, "props"), _init = _init ? _init.value : undefined, {
  enumerable: true,
  configurable: true,
  writable: true,
  initializer: function initializer() {
    return _init;
  }
}), _class2), _applyDecoratedDescriptor(_class2, "create", [_dec3], (_init2 = Object.getOwnPropertyDescriptor(_class2, "create"), _init2 = _init2 ? _init2.value : undefined, {
  enumerable: true,
  configurable: true,
  writable: true,
  initializer: function initializer() {
    return _init2;
  }
}), _class2), _applyDecoratedDescriptor(_class2.prototype, "showName", [_dec4], Object.getOwnPropertyDescriptor(_class2.prototype, "showName"), _class2.prototype)), _class2)) || _class);
exports.default = Test;
;

function isTestable(value) {
  return function decorator(target) {
    target.isTestable = value;
  };
}

function enumerable(value) {
  return function (target, key, descriptor) {
    descriptor.enumerable = value;
    return descriptor;
  };
}