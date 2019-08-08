import Astar from '../index';

class Game {
  grid = [];
  nodes = {};
  startNodeId = '';
  endNodeId = '';

  constructor(map) {
    this.parseMap(map);
    this.astar = new Astar(this.startNodeId, this.endNodeId, this.getNeighbors);
  }

  getNeighbors = (nodeId) => {
    const node = this.nodes[nodeId];
    const endNode = this.nodes[this.endNodeId];
    const { x, y, char } = node;
    return [
      `${x - 1},${y - 1}`,
      `${x},${y - 1}`,
      `${x + 1},${y - 1}`,
      `${x - 1},${y}`,
      `${x + 1},${y}`,
      `${x - 1},${y + 1}`,
      `${x},${y + 1}`,
      `${x + 1},${y + 1}`,
    ].map(t => this.nodes[t]).filter(t => t).map(t => {
      const dis = Math.abs(x - t.x) + Math.abs(y - t.y);
      let singleCost = dis > 1 ? 14 : 10;
      if (char === '+') { singleCost = 9999; }
      const predictCost = (Math.abs(endNode.x - t.x) + Math.abs(endNode.y - t.y)) * 10;
      return {
        id: t.id,
        singleCost,
        predictCost,
      };
    });
  };

  parseMap(map) {
    const rows = map.split('\n').map(t => t.trim()).filter(t => t);
    rows.forEach((line, y) => {
      const row = [];
      line.split('').forEach((t, x) => {
        const id = `${x},${y}`;
        const node = {
          id,
          x,
          y,
          char: t,
        };
        this.nodes[id] = node;
        row.push(node);
        if (t === 'A') { this.startNodeId = id; }
        if (t === 'B') { this.endNodeId = id; }
      });
      this.grid.push(row);
    });
  }

  start() {
    this.next().then();
  }

  async next() {
    const rel = await this.astar.next();
    this.paint(this.astar.getPath());
    if (rel === 0) {
      setTimeout(() => {
        this.next().then();
      }, 100);
    }
  }

  paint(path = []) {
    const map = [];
    this.grid.forEach(row => {
      row.forEach(t => {
        map.push(' ');
        if (path.includes(t.id)) {
          map.push('*');
        } else {
          map.push(t.char);
        }
      });
      map.push('\n');
    });
    console.log(map.join(''));
  }
}

export default Game;
