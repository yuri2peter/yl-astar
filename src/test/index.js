// const Test = require('./test-class');
import Test from './test-class';

const t = Test.create('t1');

t.showName();

t.work1();

t.work2().then();

const work3 = t.work3();
work3.next();
work3.next();
