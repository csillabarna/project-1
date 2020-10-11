const start = document.querySelector('#start')
const time = document.querySelector('#time')
const points = document.querySelector('.points')
const reset = document.querySelector('#reset')
const grid = document.querySelector('.grid')
const width = 5
const cells = []
const colors = ['red', 'green', 'blue']

// create the grid
for (let i = 0; i < width ** 2; i++) {
  const div = document.createElement('div')
  grid.appendChild(div)
  div.innerHTML = i //remove later
  cells.push(div)
}
// fill every cell with random colors
function colorFill(array) {
  array.forEach((cell, i) => {
    const randomColorIndex = Math.floor(Math.random() * colors.length)
    const randomColor = colors[randomColorIndex]
    cell.classList.add(randomColor)

    console.log(`random fill on ${i} ${randomColor}`)
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
  colorFill(cells)
  rowRemoveAndFill(10)


  // match3Column()
})


// reset button event listener remove all classes 
reset.addEventListener('click', () => {
  clear()
})

// function rowRemoveAndFill() {
//   cells.forEach((cell, i) => {
//     if ((i % width === width - 2) || (i % width === width - 1)) {
//       console.log(`ignoring i ${i}`)
//     } else {
//       const first = cells[i].classList[0]
//       // console.log(first)
//       const second = cells[i + 1].classList[0]
//       // console.log(second)
//       const third = cells[i + 2].classList[0]
//       // console.log(third)
//       const treeCellClass = [first, second, third]
//       console.log(`removed, ${i} ${cell.classList}`)
//       cell.classList.remove(first)
//     }

//   })

// }
// rowRemoveAndFill()

// cells.forEach((cell) => {
//   const colors = ['red', 'green', 'blue']
//   const randomColorIndex = Math.floor(Math.random() * colors.length)
//   const randomColor = colors[randomColorIndex]
//   cell.classList.add(randomColor)
//   // console.log(Array.from(cell.classList))
// })



function rowRemoveAndFill(index) {

  for (let i = index; i >= 0; i -= width) {
    const first = cells[i].classList[0]
    const second = cells[i + 1].classList[0]
    const third = cells[i + 2].classList[0]
    const arrayOfThree = [cells[i], cells[i + 1], cells[i + 2]]

    if (i < width) {
      console.log(i, first, second, third)
      cells[i].classList.remove(first), cells[i + 1].classList.remove(second), cells[i + 2].classList.remove(third)
      colorFill(arrayOfThree)
    } else {

      const newFirst = cells[i - width].classList[0]
      const newSecond = cells[(i + 1) - width].classList[0]
      const newThird = cells[(i + 2) - width].classList[0]

      cells[i].classList.remove(first), cells[i + 1].classList.remove(second), cells[i + 2].classList.remove(third)
      console.log(i, first, second, third)

      cells[i].classList.add(newFirst), cells[i + 1].classList.add(newSecond), cells[i + 2].classList.add(newThird)
      console.log(newFirst, newSecond, newThird)
    }

  }

}



