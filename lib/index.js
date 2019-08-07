"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es6.promise");

require("core-js/modules/es6.array.for-each");

require("regenerator-runtime/runtime");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.set");

require("core-js/modules/es6.object.define-property");

var _lodash = _interopRequireDefault(require("lodash"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Node =
/*#__PURE__*/
function () {
  function Node(id) {
    _classCallCheck(this, Node);

    this.id = id;
    this.parentId = null;
    this.updateCosts(0, 0);
  }

  _createClass(Node, [{
    key: "setParentId",
    value: function setParentId(parentId) {
      this.parentId = parentId;
    }
  }, {
    key: "updateCosts",
    value: function updateCosts(forNowCost, predictCost) {
      this.forNowCost = forNowCost; // g

      this.predictCost = predictCost; // h

      this.costs = this.forNowCost + this.predictCost; // f
    }
  }, {
    key: "getCosts",
    value: function getCosts() {
      return this.costs;
    }
  }]);

  return Node;
}();

var Astar =
/*#__PURE__*/
function () {
  /**
   * Set start and end nodes
   * @param {string} startNodeId
   * @param {string} endNodeId
   * @param {function} getNeighbors
   *   async (nodeId) => [{id: id1, singleCost: g1, predictCost: h1}, {id: id2, singleCost: g2, predictCost: h2}]
   */
  function Astar(startNodeId, endNodeId, getNeighbors) {
    _classCallCheck(this, Astar);

    var startNode = new Node(startNodeId);
    var endNode = new Node(endNodeId);
    this.data = {
      openList: [],
      openSet: new Set(),
      closeSet: new Set(),
      nodes: {},
      startNode: startNode,
      endNode: endNode,
      lastNode: null
    };
    this.getNeighbors = getNeighbors;
    this.data.nodes[startNodeId] = startNode;
    this.data.nodes[endNodeId] = endNode;
    this.data.openSet.add(startNodeId);
    this.data.openSet.add(startNodeId);
    this.data.openList.push(startNode);
  }
  /**
   * 下一步
   * @return {Promise<number>} 0 未完成, 1 完成, -1 找不到路径
   */


  _createClass(Astar, [{
    key: "next",
    value: function () {
      var _next2 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee() {
        var _this = this;

        var currentNode, neighborNodes;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!this.data.openSet.has(this.data.endNode.id)) {
                  _context.next = 2;
                  break;
                }

                return _context.abrupt("return", 1);

              case 2:
                if (!(this.data.openSet.size === 0)) {
                  _context.next = 4;
                  break;
                }

                return _context.abrupt("return", -1);

              case 4:
                currentNode = this.data.openList.shift(); // Node which has min f

                this.data.closeSet.add(currentNode.id); // Add to closeSet

                _context.next = 8;
                return this.getNeighbors(currentNode.id);

              case 8:
                neighborNodes = _context.sent;
                neighborNodes.forEach(function (_ref) {
                  var id = _ref.id,
                      singleCost = _ref.singleCost,
                      predictCost = _ref.predictCost;

                  if (_this.data.closeSet.has(id)) {
                    return;
                  }

                  if (!_this.data.nodes[id]) {
                    var newNode = new Node(id);
                    newNode.updateCosts(singleCost, predictCost);
                    _this.data.nodes[id] = newNode;
                  }

                  var testNode = _this.data.nodes[id];

                  if (_this.data.openSet.has(id)) {
                    // 如果它已经在 open list 中，检查这条路径 ( 即经由当前方格到达它那里 ) 是否更好，用 G 值作参考。
                    // 更小的 G 值表示这是更好的路径。如果是这样，把它的父亲设置为当前方格，并重新计算它的 G 和 F 值。
                    // 如果你的 open list 是按 F 值排序的话，改变后你可能需要重新排序。
                    var newForNowCost = singleCost + currentNode.forNowCost;

                    if (newForNowCost < testNode.forNowCost) {
                      // 更新节点信息
                      testNode.setParentId(currentNode.id);
                      testNode.updateCosts(newForNowCost, predictCost); // 重新排序

                      _lodash["default"].pullAllBy(_this.data.openList, [testNode], 'id');

                      var sortedIndex = _lodash["default"].sortedIndexBy(_this.data.openList, testNode, function (t) {
                        return t.getCosts();
                      });

                      _this.data.openList.splice(sortedIndex, 0, testNode);
                    }
                  } else {
                    // 如果它不在 open list 中，把它加入 open list ，并且把当前方格设置为它的父亲，记录该方格的 F ， G 和 H 值
                    var _newForNowCost = singleCost + currentNode.forNowCost;

                    testNode.updateCosts(_newForNowCost, predictCost);

                    _this.data.openSet.add(id);

                    testNode.setParentId(currentNode.id);

                    var _sortedIndex = _lodash["default"].sortedIndexBy(_this.data.openList, testNode, function (t) {
                      return t.getCosts();
                    });

                    _this.data.openList.splice(_sortedIndex, 0, testNode);
                  }
                });
                this.data.lastNode = currentNode;
                return _context.abrupt("return", 0);

              case 12:
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
    key: "getPath",
    value: function getPath() {
      var path = [];
      var currentPathNode = this.data.lastNode;

      while (currentPathNode.parentId) {
        path.unshift(currentPathNode.id);
        currentPathNode = this.data.nodes[currentPathNode.parentId];
      }

      return path;
    }
  }]);

  return Astar;
}();

var _default = Astar;
exports["default"] = _default;
//# sourceMappingURL=index.js.map