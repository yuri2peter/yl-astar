import _ from 'lodash';

class Node {
  constructor(id) {
    this.id = id;
    this.parentId = null;
    this.updateCosts(0, 0);
  }

  setParentId(parentId) {
    this.parentId = parentId;
  }

  updateCosts(forNowCost, predictCost) {
    this.forNowCost = forNowCost; // g
    this.predictCost = predictCost; // h
    this.costs = this.forNowCost + this.predictCost; // f
  }

  getCosts() {
    return this.costs;
  }
}

class Astar {
  /**
   * Set start and end nodes
   * @param {string} startNodeId
   * @param {string} endNodeId
   * @param {function} getNeighbors
   *   async (nodeId) => [{id: id1, singleCost: g1, predictCost: h1}, {id: id2, singleCost: g2, predictCost: h2}]
   */
  constructor(startNodeId, endNodeId, getNeighbors) {
    const startNode = new Node(startNodeId);
    const endNode = new Node(endNodeId);
    this.data = {
      openList: [],
      openSet: new Set(),
      closeSet: new Set(),
      nodes: {},
      startNode,
      endNode,
      lastNode: null,
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
  async next() {
    // 把终点加入到了 open list 中，此时路径已经找到
    if (this.data.openSet.has(this.data.endNode.id)) {
      return 1;
    }

    // open list 是空的，此时没有路径
    if (this.data.openSet.size === 0) {
      return -1;
    }

    const currentNode = this.data.openList.shift(); // Node which has min f
    this.data.closeSet.add(currentNode.id); // Add to closeSet

    const neighborNodes = await this.getNeighbors(currentNode.id);
    neighborNodes.forEach(({ id, singleCost, predictCost }) => {
      if (this.data.closeSet.has(id) ) { return; }
      if (!this.data.nodes[id]) {
        const newNode = new Node(id);
        newNode.updateCosts(singleCost, predictCost);
        this.data.nodes[id] = newNode;
      }
      const testNode = this.data.nodes[id];
      if (this.data.openSet.has(id)) {
        // 如果它已经在 open list 中，检查这条路径 ( 即经由当前方格到达它那里 ) 是否更好，用 G 值作参考。
        // 更小的 G 值表示这是更好的路径。如果是这样，把它的父亲设置为当前方格，并重新计算它的 G 和 F 值。
        // 如果你的 open list 是按 F 值排序的话，改变后你可能需要重新排序。
        const newForNowCost = singleCost + currentNode.forNowCost;
        if (newForNowCost < testNode.forNowCost) {
          // 更新节点信息
          testNode.setParentId(currentNode.id);
          testNode.updateCosts(newForNowCost, predictCost);

          // 重新排序
          _.pullAllBy(this.data.openList, [testNode], 'id');
          const sortedIndex = _.sortedIndexBy(this.data.openList, testNode, t => t.getCosts());
          this.data.openList.splice(sortedIndex, 0, testNode);
        }
      } else {
        // 如果它不在 open list 中，把它加入 open list ，并且把当前方格设置为它的父亲，记录该方格的 F ， G 和 H 值
        const newForNowCost = singleCost + currentNode.forNowCost;
        testNode.updateCosts(newForNowCost, predictCost);

        this.data.openSet.add(id);
        testNode.setParentId(currentNode.id);
        const sortedIndex = _.sortedIndexBy(this.data.openList, testNode, t => t.getCosts());
        this.data.openList.splice(sortedIndex, 0, testNode);
      }
    });
    this.data.lastNode = currentNode;
    return 0;
  }

  getPath () {
    const path = [];
    let currentPathNode = this.data.lastNode;
    while (currentPathNode.parentId) {
      path.unshift(currentPathNode.id);
      currentPathNode = this.data.nodes[currentPathNode.parentId];
    }
    return path;
  }

}

export default Astar;
