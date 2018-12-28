"use strict";

var _testClass = _interopRequireDefault(require("./test-class"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// const Test = require('./test-class');
var t = _testClass.default.create('t1');

t.showName();
t.work1();
t.work2().then();
var work3 = t.work3();
work3.next();
work3.next();
//# sourceMappingURL=index.js.map