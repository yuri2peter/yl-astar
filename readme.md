# yl-astar

一个支持异步和单步控制的A*寻路算法，自用。

## Quick Start

```
const Astar = require('yl-astar');

// 每一个地图区块（node）需要一个唯一标识id，推荐字符串，同时需要一个异步函数getNeighbors
const startNodeId = 'A'; // 起点id
const endNodeId = 'B'; // 终点id
const getNeighbors = async (nodeId) => {
    // 根据实际情况生成返回值
    // nodeId标识了一个node，根据这个node，需要返回一个附近node信息数组，
    // 表示节点附近可以到达的节点以及需要的代价
    // 代价对于每一次移动是不等的，比如从平原地形到河流地形比起到另一个平原地形需要更多的代价
    await someWorks();
    return [
        {
            id: id1, // node分配的id
            singleCost: 10, // 从当前node到该node的代价
            predictCost: 100,  // 该node到终点预估的代价（一般可以用地图距离估算）
        },
        { id: id2, ... }, { id: id3, ... }
    ];
}
const astar = new Astar(startNodeId, endNodeId, getNeighbors);

// 找出一个合适的路径往往需要很多步，next是一个async function，每次调用都会执行一步
// 你可以控制next调用的频率防止太过复杂的地图瞬间占用太多计算资源
astar.next().then((rel) => {
    // rel有三种返回值
    // 0：路径未确定；-1：找不到路径；1：已找到路径
    // getPath方法返回当前尝试的路径，如['id1', 'id2', 'id3']
    console.log(rel, astar.getPath());
})

```
