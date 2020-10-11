const start = document.querySelector('#start')
const time = document.querySelector('#time')
const points = document.querySelector('.points')
const reset = document.querySelector('#reset')
const grid = document.querySelector('.grid')
const width = 5
const cells = []

// create the grid
for (let i = 0; i < width ** 2; i++) {
  const div = document.createElement('div')
  grid.appendChild(div)
  div.innerHTML = i //remove later
  cells.push(div)
}
// fill every cell with random colors
function colorFill() {
  cells.forEach((cell) => {
    const colors = ['red', 'green', 'blue']
    const randomColorIndex = Math.floor(Math.random() * colors.length)
    const randomColor = colors[randomColorIndex]
    cell.classList.add(randomColor)
    // console.log(Array.from(cell.classList))
  })
}
// remove all classes from cell
function clear() {
  cells.forEach((cell) => {
    // if ((cell.classList.contains('red')) || (cell.classList.contains('green')) || (cell.classList.contains('blue'))) {
    cell.className = ''
    // }
  })
}


//check 3 matches in rows
function match3Row() {
  for (let i = 0; i < width ** 2; i++) {

    if ((i % width === width - 2) || (i % width === width - 1)) {
      console.log(`ignoring i ${i}`)
    } else {
      const first = cells[i].classList[0]
      // console.log(first)
      const second = cells[i + 1].classList[0]
      // console.log(second)
      const third = cells[i + 2].classList[0]
      // console.log(third)
      const match3R = first === second && first === third
      if (match3R) {
        console.log(`starting from ${i} ${first} and ${second} and ${third} are the same in the row `)

      }

    }
  }
}

//check 3 matches in columns
function match3Column() {

  for (let i = 0; i < width ** 2; i++) {

    if (i >= width ** 2 - width * 2) {
      console.log(`ignoring i ${i}`)
    } else {
      const first = cells[i].classList[0]
      // console.log(first)
      const second = cells[i + width].classList[0]
      // console.log(second)
      const third = cells[i + width * 2].classList[0]
      // console.log(third)
      const match3C = first === second && first === third
      if (match3C) {
        console.log(` starting from ${i}  ${first} and ${second} and ${third} are the same in the column `)

      }

    }
  }

}
// start button event listener

start.addEventListener('click', () => {
  colorFill()
  match3Row()
  match3Column()
})


// reset button event listener remove all classes 
reset.addEventListener('click', () => {
  clear()
})
