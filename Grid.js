const GRID_SIZE = 4;
const CELL_SIZE = 20;
const CELL_GAP = 2;


export default class Grid {
   // private variables
   #cells

   constructor(gridElement) {
      gridElement.style.setProperty("--grid-size", GRID_SIZE)
      gridElement.style.setProperty("--cell-size", `${CELL_SIZE}vmin`)
      gridElement.style.setProperty("--cell-gap", `${CELL_GAP}vmin`)
      this.#cells = createCellElement(gridElement).map((cellElement, index) => {
         return new Cell(
            cellElement, 
            index % GRID_SIZE, 
            Math.floor(index / GRID_SIZE)
         )
      })
      console.log(this.cells)
   }

   get #emtyCells() {
      return this.#cells.filter(cell => cell.tile == null)
   }

   get cells() {
      return this.#cells
   }

   get cellsByColumn() {
      return this.#cells.reduce((cellGird, cell) => {
         cellGird[cell.x] = cellGird[cell.x] || []
         cellGird[cell.x][cell.y] = cell
         return cellGird
      }, [])
   }

   get cellsByRow() {
      return this.#cells.reduce((cellGird, cell) => {
         cellGird[cell.y] = cellGird[cell.y] || []
         cellGird[cell.y][cell.x] = cell
         return cellGird
      }, [])
   }

   randomEmptyCell() {
      const randomIndex = Math.floor(Math.random() * this.#emtyCells.length)
      return this.#emtyCells[randomIndex]
   }

}

class Cell {
   // private variables
   #cellElement
   #x
   #y
   #tile
   #mergeTile

   constructor(cellElement, x, y) {
      this.#cellElement = cellElement
      this.#x = x
      this.#y = y
   }

   get x() {
      return this.#x;
   }

   get y() {
      return this.#y;
   }

   get tile() {
      return this.#tile
   }

   set tile(value) {
      this.#tile = value
      if (value == null) return
      this.#tile.x = this.#x
      this.#tile.y = this.#y
   }

   get mergeTile() {
      return this.#mergeTile
   }

   set mergeTile(value) {
      this.#mergeTile = value
      if (value == null) return
      this.#mergeTile.x = this.#x
      this.#mergeTile.y = this.#y
   }

   canAccept(tile) {
      return (this.tile == null || 
         (this.mergeTile == null && this.tile.value === tile.value)
      )
   }

   mergeTiles() {
      if (this.tile == null || this.mergeTile == null) return
      this.tile.value = this.tile.value + this.mergeTile.value;
      this.mergeTile.remove()
      this.mergeTile = null
   }
}

function createCellElement(gridElement) {
   const cells = []
   for (let i = 0; i < GRID_SIZE * GRID_SIZE; i++) {
      const cell = document.createElement("div")
      cell.classList.add("cell")
      cells.push(cell)  
      gridElement.append(cell)
   }
   return cells
}