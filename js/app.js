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
  div.setAttribute('id', i)

  div.innerHTML = i //remove later
  cells.push(div)
}
// fill every cell with random colors
function randomColorFill(array) {
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

function disableBtn() {
  start.disabled = true
}
function enableBtn() {
  start.disabled = false
}
// main function
function checkCrushFill() {
  function hasMatches() {
    return match3Column() || match3Row()
  }
  while (hasMatches()) {
    match3AndFillR()
    match3AndFillC()
  }
}


// start button event listener
start.addEventListener('click', () => {
  randomColorFill(cells)
  // setTimeout(() => match3AndFillR(), 3000)
  checkCrushFill()
  disableBtn()
})


// reset button event listener remove all classes 
reset.addEventListener('click', () => {
  clear()
  enableBtn()
})



function neighbourCheck(firstId, secondId) {
  return secondId === firstId + 1
    || secondId === firstId - 1
    || secondId === firstId + width
    || secondId === firstId - width
}
// let colorCheck = false
// const arrayCheck = [[tt, t], [t, b], [b, bb], [ll, l], [l, r], [r, rr]]
// let i = 0
// while (i < arrayCheck.length && colorCheck === false) {
//   if (arrayCheck[i][0] && arrayCheck[i][1] && arrayCheck[i][0].classList[1] === color && arrayCheck[i][1].classList[1] === color) {
//     colorCheck = true
//   } else {
//     colorCheck = false
//   }
//   i++
// }


function colorCheck(firstId, firstColor, secondId, secondColor) {
  const isRow = Math.abs(firstId - secondId) === 1

  if (isRow) {
    if (firstId > secondId) {
      return colorCheckRow(secondId, secondColor, firstId, firstColor)
    } else {
      return colorCheckRow(firstId, firstColor, secondId, secondColor)
    }
  } else {
    if (firstId > secondId)
      return colorCheckColumn(secondId, secondColor, firstId, firstColor)
    else {
      return colorCheckColumn(firstId, firstColor, secondId, secondColor)
    }
  }
}

function colorCheckRow(leftId, leftColor, rightId, rightColor) {

  const checkAgainstLeft = [
    [cells[rightId + 1], cells[rightId + 2]],
    [cells[rightId - width], cells[rightId - width * 2]],
    [cells[rightId + width], cells[rightId + width * 2]],
    [cells[rightId + width], cells[rightId - width]]
  ]

  const checkAgainstRight = [
    [cells[leftId - 1], cells[leftId - 2]],
    [cells[leftId - width], cells[leftId - width * 2]],
    [cells[leftId + width], cells[leftId + width * 2]],
    [cells[leftId + width], cells[leftId - width]]
  ]
  for (let i = 0; i < checkAgainstLeft.length; i++) {
    // console.log(checkAgainstLeft[i][0], checkAgainstLeft[i][1], i, ' check against left colors')
    if (checkAgainstLeft[i][0] && checkAgainstLeft[i][0].classList[0] === leftColor
      && checkAgainstLeft[i][1] && checkAgainstLeft[i][1].classList[0] === leftColor) {

      return true
    }

  }
  for (let i = 0; i < checkAgainstRight.length; i++) {
    if (checkAgainstRight[i][0] && checkAgainstRight[i][0].classList[0] === rightColor
      && checkAgainstRight[i][1] && checkAgainstRight[i][1].classList[0] === rightColor) {
      return true
    }

  }
  console.log('row', leftId, leftColor, rightId, rightColor)
  return false
}

function colorCheckColumn(topId, topColor, bottomId, bottomColor) {
  console.log('column', topId, topColor, bottomId, bottomColor)
  return false
}



// function colorCheck(firstId, firstColor, secondId, secondColor) {
//   const firstTopC = document.getElementById(firstId - width).classList[0]
//   const firstTopPlusC = document.getElementById(firstId - width * 2).classList[0]
//   const firstBottomC = document.getElementById(firstId + width).classList[0]
//   const firstBottomPlusC = document.getElementById(firstId + width * 2).classList[0]
//   const firstRightC = document.getElementById(firstId + 1).classList[0]
//   const firstRightPlusC = document.getElementById(firstId + 2).classList[0]
//   const firstLeftPlusC = document.getElementById(firstId - 2).classList[0]
// const secondTopC = document.getElementById(secondId - width).classList[0]
// const secondTopPlusC = document.getElementById(secondId - width * 2).classList[0]
// const secondBottomC = document.getElementById(secondId + width).classList[0]
// const secondBottomPlusC = document.getElementById(secondId + width * 2).classList[0]
// const secondLeftC = document.getElementById(secondId - 1).classList[0]
// const secondLeftPlusC = document.getElementById(secondId - 2).classList[0]

//   let isColor = false
//   const arrayCheck = [[firstTopPlusC, firstTopC], [firstTopC, firstBottomC], [firstBottomC, firstBottomPlusC], [firstLeftPlusC, secondColor], [secondColor, firstRightC], [firstRightC, firstRightPlusC]]
//   let i = 0
//   while (i < arrayCheck.length && colorCheck === false) {
//     if (arrayCheck[i][0] && (arrayCheck[i][0] === firstColor) && (arrayCheck[i][1] === firstColor)) {
//       isColor = true
//     } else {
//       isColor = false
//     }
//     i++
//   }

//   return isColor
// }






cells.forEach((cell) => {
  cell.addEventListener('click', () => {

    if (document.querySelector('.selected')) {
      const firstId = parseInt(document.querySelector('.selected').id)
      console.log('first selected ID is:', firstId)
      const firstColor = document.querySelector('.selected').classList[0]
      console.log(firstColor)
      const secondId = parseInt(cell.id)
      console.log('second selected ID is:', secondId)
      const secondColor = cell.classList[0]
      console.log(secondColor)
      const firstCell = document.querySelector('.selected')
      const secondCell = cell
      //// against second color
      // // against first color
      // const secondTopC = document.getElementById(secondId - width).classList[0]
      // const secondTopPlusC = document.getElementById(secondId - width * 2).classList[0]
      // const secondBottomC = document.getElementById(secondId + width).classList[0]
      // const secondBottomPlusC = document.getElementById(secondId + width * 2).classList[0]
      // const secondLeftC = document.getElementById(secondId - 1).classList[0]
      // const secondLeftPlusC = document.getElementById(secondId - 2).classList[0]


      if (neighbourCheck(firstId, secondId) && colorCheck(firstId, firstColor, secondId, secondColor)) {
        firstCell.classList.remove(firstColor)
        firstCell.classList.add(secondColor)

        secondCell.classList.remove(secondColor)
        secondCell.classList.add(firstColor)
        checkCrushFill()
      } else {
        secondCell.classList.add('shake')
        console.log('shake has been added')

      }

      document.querySelector('.selected').classList.remove('selected')

    } else {
      cell.classList.add('selected')
      if (document.querySelector('.shake')) {
        document.querySelector('.shake').classList.remove('shake')
      }
    }

  })
})














function match3AndFillR() {

  let hasRowMatch = true

  while (hasRowMatch) {
    for (let i = 0; i < width ** 2; i++) {
      if (i === (width ** 2) - 1) {
        console.log('no more row match in the board')
        hasRowMatch = false
      } else if ((i % width === width - 2) || (i % width === width - 1)) {
        console.log(`ignoring i ${i}`)
      } else {
        const first = cells[i].classList[0]
        const second = cells[i + 1].classList[0]
        const third = cells[i + 2].classList[0]

        const match3R = first === second && first === third

        if (match3R) {
          console.log(`starting from ${i} ${first} and ${second} and ${third} are the same in the row `)
          rowRemoveAndFill(i)
          break
        }

      }
    }
  }
}

function match3AndFillC() {

  let hasColumnMatch = true

  while (hasColumnMatch) {
    for (let i = 0; i < width ** 2; i++) {
      if (i === (width ** 2) - 1) {
        console.log('no more column match in the board')
        hasColumnMatch = false
      } else if (i >= width ** 2 - width * 2) {
        console.log(`ignoring i ${i}`)
      } else {
        const first = cells[i].classList[0]
        const second = cells[i + width].classList[0]
        const third = cells[i + width * 2].classList[0]

        const match3C = first === second && first === third

        if (match3C) {
          console.log(` starting from ${i}  ${first} and ${second} and ${third} are the same in the column `)
          columnRemoveAndFill(i)
          break
        }

      }
    }
  }
}


//check 3 matches in rows
function match3Row() {
  for (let i = 0; i < width ** 2; i++) {

    if ((i % width === width - 2) || (i % width === width - 1)) {
      console.log(`ignoring i ${i}`)
    } else {
      const first = cells[i].classList[0]
      const second = cells[i + 1].classList[0]
      const third = cells[i + 2].classList[0]
      const match3R = first === second && first === third
      if (match3R) {
        console.log(`starting from ${i} ${first} and ${second} and ${third} are the same in the row `)
        return true
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
      const second = cells[i + width].classList[0]
      const third = cells[i + width * 2].classList[0]

      const match3C = first === second && first === third
      if (match3C) {
        console.log(` starting from ${i}  ${first} and ${second} and ${third} are the same in the column `)
        return true
      }

    }
  }

}

// row remove and fill
function rowRemoveAndFill(index) {

  for (let i = index; i >= 0; i -= width) {
    const first = cells[i].classList[0]
    const second = cells[i + 1].classList[0]
    const third = cells[i + 2].classList[0]
    const arrayOfThree = [cells[i], cells[i + 1], cells[i + 2]]

    if (i < width) {
      console.log(i, first, second, third, 'in row')
      cells[i].classList.remove(first), cells[i + 1].classList.remove(second), cells[i + 2].classList.remove(third)
      randomColorFill(arrayOfThree)
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

// column remove and fill
function columnRemoveAndFill(index) {

  for (let i = index; i >= 0; i -= (width * 3)) {

    const first = cells[i].classList[0]
    const second = cells[i + width].classList[0]
    const third = cells[i + width * 2].classList[0]
    console.log(i, first, second, third, ' in column')
    const arrayOfThree = [cells[i], cells[i + width], cells[i + width * 2]]
    // console.log(arrayOfThree, 'column')


    // 1. special case - starting from the first row
    if (i < width) {
      console.log(i, first, second, third, 'has been removed')
      cells[i].classList.remove(first), cells[i + width].classList.remove(second), cells[i + width * 2].classList.remove(third)
      randomColorFill(arrayOfThree)


      // 2. special case - starting from the second row
    } else if (i >= width && i < width * 2) {
      cells[i].classList.remove(first), cells[i + width].classList.remove(second), cells[i + width * 2].classList.remove(third)
      console.log(i, first, second, third, 'has been removed')

      const newThird = cells[i - width].classList[0]
      cells[i + width * 2].classList.add(newThird)
      console.log(newThird, ' added as a new third color')
      // remove color class from the cells from top and after assign a new random color
      cells[i - width].classList.remove(newThird)
      //we copyd and removed a color from cells[i] and the rest also been removed so need a new random color
      randomColorFill([cells[i - width], cells[i], cells[i + width]])


      // 3. special case - starting from the third row
    } else if (i >= width * 2 && i < width * 3) {

      cells[i].classList.remove(first), cells[i + width].classList.remove(second), cells[i + width * 2].classList.remove(third)
      console.log(i, first, second, third, 'has been removed')

      const newSecond = cells[i - width * 2].classList[0]
      const newThird = cells[i - width].classList[0]

      cells[i + width].classList.add(newSecond), cells[i + width * 2].classList.add(newThird)
      console.log(newSecond, newThird, ' added as a new color')

      // remove color class from the cells from top and second row and after assign a new random color
      cells[i - width * 2].classList.remove(newSecond)
      cells[i - width].classList.remove(newThird)
      //  we copy the color from theese cells but they will need a new random color and also for the third cell (cell[i])
      randomColorFill([cells[i - width * 2], cells[i - width], cells[i]])

    } else {
      console.log('else', i)
    }

  }

}