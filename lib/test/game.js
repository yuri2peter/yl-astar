"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es6.promise");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es7.array.includes");

require("core-js/modules/es6.string.includes");

require("regenerator-runtime/runtime");

require("core-js/modules/es6.array.for-each");

require("core-js/modules/es6.string.trim");

require("core-js/modules/es6.regexp.split");

require("core-js/modules/es6.array.filter");

require("core-js/modules/es6.array.map");

var _index = _interopRequireDefault(require("../index"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Game =
/*#__PURE__*/
function () {
  function Game(map) {
    var _this = this;

    _classCallCheck(this, Game);

    this.grid = [];
    this.nodes = {};
    this.startNodeId = '';
    this.endNodeId = '';

    this.getNeighbors = function (nodeId) {
      var node = _this.nodes[nodeId];
      var endNode = _this.nodes[_this.endNodeId];
      var x = node.x,
          y = node.y,
          _char = node["char"];
      return ["".concat(x - 1, ",").concat(y - 1), "".concat(x, ",").concat(y - 1), "".concat(x + 1, ",").concat(y - 1), "".concat(x - 1, ",").concat(y), "".concat(x + 1, ",").concat(y), "".concat(x - 1, ",").concat(y + 1), "".concat(x, ",").concat(y + 1), "".concat(x + 1, ",").concat(y + 1)].map(function (t) {
        return _this.nodes[t];
      }).filter(function (t) {
        return t;
      }).map(function (t) {
        var dis = Math.abs(x - t.x) + Math.abs(y - t.y);
        var singleCost = dis > 1 ? 14 : 10;

        if (_char === '+') {
          singleCost = 9999;
        }

        var predictCost = (Math.abs(endNode.x - t.x) + Math.abs(endNode.y - t.y)) * 10;
        return {
          id: t.id,
          singleCost: singleCost,
          predictCost: predictCost
        };
      });
    };

    this.parseMap(map);
    this.astar = new _index["default"](this.startNodeId, this.endNodeId, this.getNeighbors);
  }

  _createClass(Game, [{
    key: "parseMap",
    value: function parseMap(map) {
      var _this2 = this;

      var rows = map.split('\n').map(function (t) {
        return t.trim();
      }).filter(function (t) {
        return t;
      });
      rows.forEach(function (line, y) {
        var row = [];
        line.split('').forEach(function (t, x) {
          var id = "".concat(x, ",").concat(y);
          var node = {
            id: id,
            x: x,
            y: y,
            "char": t
          };
          _this2.nodes[id] = node;
          row.push(node);

          if (t === 'A') {
            _this2.startNodeId = id;
          }

          if (t === 'B') {
            _this2.endNodeId = id;
          }
        });

        _this2.grid.push(row);
      });
    }
  }, {
    key: "start",
    value: function start() {
      this.next().then();
    }
  }, {
    key: "next",
    value: function () {
      var _next2 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee() {
        var _this3 = this;

        var rel;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this.astar.next();

              case 2:
                rel = _context.sent;
                this.paint(this.astar.getPath());

                if (rel === 0) {
                  setTimeout(function () {
                    _this3.next().then();
                  }, 100);
                }

              case 5:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function next() {
        return _next2.apply(this, arguments);
      }

      return next;
    }()
  }, {
    key: "paint",
    value: function paint() {
      var path = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      var map = [];
      this.grid.forEach(function (row) {
        row.forEach(function (t) {
          if (path.includes(t.id)) {
            map.push('*');
          } else {
            map.push(t["char"]);
          }
        });
        map.push('\n');
      });
      console.log(map.join(''));
    }
  }]);

  return Game;
}();

var _default = Game;
exports["default"] = _default;
//# sourceMappingURL=game.js.map