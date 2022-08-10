// Every 250 milliseconds, one of the eligible squares should be randomly selected to change colors.
// Squares are eligible for a color change if its color has not changed in the last two seconds.

class Cell {
  constructor(cellId) {
    this.ref = document.getElementById(cellId);
    this.canChangeColor = true;
    this.currentColor = '#2A9D8F';
  }

  changeColor(color) {
    this.ref.style.backgroundColor = color;
    this.currentColor = color;
    this.canChangeColor = false;
    setTimeout(() => {
      this.canChangeColor = true;
    }, 2000);
  }
}

class GridManager {
  constructor () {
    this.referenceTable = {};
    this.colorTable = [
      '#264653',
      '#2A9D8F',
      '#E9C46A',
      '#F4A261',
      '#E76F51'
    ];
  }

  createViewAndStoreRefs() {
    const grid = document.getElementById('grid');
    const labelDict = ['a', 'b', 'c', 'd'];
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        const cell = document.createElement('div');
        const id = labelDict[j] + i.toString();
        cell.className = 'cell';
        cell.id = id;
        grid.appendChild(cell);
        this.referenceTable[id] = new Cell(id);
      }
    }
  }

  randomColor(currentColor) {
    const availableColors = this.colorTable.filter(color => color != currentColor);
    const color = availableColors[Math.floor(Math.random() * availableColors.length)].toString();
    return color;
  }

  randomAvailableCell() {
    const availableCells = [];
    for (const key in this.referenceTable) {
      const cell = this.referenceTable[key];
      if (cell.canChangeColor) {
        availableCells.push(cell);
      }
    }
    return availableCells[Math.floor(Math.random() * availableCells.length)];
  }

  startCellChangeLoop() {
    setInterval(() => {
      const cell = this.randomAvailableCell();
      const newColor = this.randomColor(cell.currentColor)
      cell.changeColor(newColor);
    }, 250);
  }

  start() {
    this.createViewAndStoreRefs();
    this.startCellChangeLoop();
  }
}

const manager = new GridManager();

manager.start();