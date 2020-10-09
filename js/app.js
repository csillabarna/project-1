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


    //check 3 matches and remove it

    for (let i = 0; i < width * 2; i++) {
      const getColorArray = [cells[i], cells[i + 1], cells[i + 2]].map(cell => Array.from(cell.classList)[0])
      if ((i % width === width - 2) || (i % width === width - 2)) {
        console.log('ignoring i')
      } else {
        // console.log(getColorArray)
      }


    }



  })
})



