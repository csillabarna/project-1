const start = document.querySelector('#start')
const time = document.querySelector('#time')
const points = document.querySelector('.points')
const reset = document.querySelector('#reset')
const grid = document.querySelector('.grid')
const width = 5
const cells = []



for (let i = 0; i < width ** 2; i++) {
  const div = document.createElement('div')
  grid.appendChild(div)
  div.innerHTML = i //remove later
  cells.push(div)
}

// fill every cell with random colors


start.addEventListener('click', () => {
  cells.forEach((cell) => {

    if (!cell.classList.contains('red', 'green', 'blue')) {
      const colors = ['red', 'green', 'blue']
      const randomColorIndex = Math.floor(Math.random() * colors.length)
      const randomColor = colors[randomColorIndex]
      cell.classList.add(randomColor)
      // console.log(Array.from(cell.classList))
    }
  })

  //check 3 matches row(and remove it)

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
      if (first === second && first === third) {
        console.log(`starting from ${i} ${first} and ${second} and ${third} are the same in the row `)

      }

    }
  }

  //check 3 matches column 

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
      if (first === second && first === third) {
        console.log(` starting from ${i}  ${first} and ${second} and ${third} are the same in the column `)

      }

    }
  }









})



