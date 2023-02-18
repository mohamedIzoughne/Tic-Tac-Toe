const areasContainer = document.querySelector('.game')
const layer = document.querySelector('.layer')
const heading = layer.querySelector('h1')
const restartBtn = layer.querySelector('button')
let userOrder = 0

const userOneClassHover = 'user-one-hover'
const userTwoClassHover = 'user-two-hover'
const userOneClassClick = 'user-one-click'
const userTwoClassClick = 'user-two-click'

const winningCombinations = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
  [1, 4, 7],
  [2, 5, 8],
  [3, 6, 9],
  [1, 5, 9],
  [3, 5, 7],
]

let userOneArr = []
let userTwoArr = []
addAreas()

function checkForWin(userArr) {
  if (userArr.length >= 3) {
    for (let i = 0; i < winningCombinations.length; i++) {
      let index = 0
      winningCombinations[i].forEach((num) => {
        if (userArr.includes(num)) {
          index++
        }
      })
      if (index === 3) {
        return true
      } else {
        index = 0
      }
    }
    return false
  }
}

restartBtn.addEventListener('click', (e) => {
  userOneArr = []
  userTwoArr = []
  addAreas()
  layer.classList.add('d-none')
})

function addAreas() {
  areasContainer.innerHTML = `<div class="area" data-order="1">
  <i class="fas fa-times times-icon game-icon"></i>
  <i class="far fa-circle circle-icon game-icon"></i>
</div>
<div class="area" data-order="2">
  <i class="fas fa-times times-icon game-icon"></i>
  <i class="far fa-circle circle-icon game-icon"></i>
</div>
<div class="area" data-order="3">
  <i class="fas fa-times times-icon game-icon"></i>
  <i class="far fa-circle circle-icon game-icon"></i>
</div>
<div class="area" data-order="4">
  <i class="fas fa-times times-icon game-icon"></i>
  <i class="far fa-circle circle-icon game-icon"></i>
</div>
<div class="area" data-order="5">
  <i class="fas fa-times times-icon game-icon"></i>
  <i class="far fa-circle circle-icon game-icon"></i>
</div>
<div class="area" data-order="6">
  <i class="fas fa-times times-icon game-icon"></i>
  <i class="far fa-circle circle-icon game-icon"></i>
</div>
<div class="area" data-order="7">
  <i class="fas fa-times times-icon game-icon"></i>
  <i class="far fa-circle circle-icon game-icon"></i>
</div>
<div class="area" data-order="8">
  <i class="fas fa-times times-icon game-icon"></i>
  <i class="far fa-circle circle-icon game-icon"></i>
</div>
<div class="area" data-order="9">
  <i class="fas fa-times times-icon game-icon"></i>
  <i class="far fa-circle circle-icon game-icon"></i>
</div>`
  const areas = document.querySelectorAll('.area')
  areas.forEach((ele) => {
    ele.addEventListener('click', (e) => {
      const target = e.currentTarget
      if (
        !target.classList.contains(userOneClassClick) &&
        !target.classList.contains(userTwoClassClick)
      ) {
        if (userOrder % 2 === 0) {
          target.classList.add(userOneClassClick)
          userOneArr.push(+target.getAttribute('data-order'))
          if (checkForWin(userOneArr)) {
            heading.innerText = "X's win"
            layer.classList.remove('d-none')
          }
          userOrder++
        } else {
          target.classList.add(userTwoClassClick)
          userTwoArr.push(+target.getAttribute('data-order'))
          if (checkForWin(userTwoArr)) {
            heading.innerText = "O's win !"
            layer.classList.remove('d-none')
          }
          userOrder++
        }
      }
      if (checkDraw()) {
        heading.innerText = 'Draw !'
        layer.classList.remove('d-none')
      }
    })
    ele.addEventListener('mouseenter', (e) => {
      const target = e.currentTarget
      if (
        !target.classList.contains(userOneClassClick) &&
        !target.classList.contains(userTwoClassClick)
      ) {
        if (userOrder % 2 === 0) {
          e.currentTarget.classList.add(userOneClassHover)
        } else {
          e.currentTarget.classList.add(userTwoClassHover)
        }
      }
    })
    ele.addEventListener('mouseleave', (e) => {
      e.currentTarget.classList.remove(userOneClassHover)
      e.currentTarget.classList.remove(userTwoClassHover)
    })
  })
}

function checkDraw() {
  return userOneArr.length + userTwoArr.length === 9
}
