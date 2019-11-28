/**********************************************
 * STARTER CODE
 **********************************************/

/**
 * shuffle()
 * Shuffle the contents of an array
 *   depending the datatype of the source
 * Makes a copy. Does NOT shuffle the original.
 * Based on Steve Griffith's array shuffle prototype
 * @Parameters: Array or string
 * @Return: Scrambled Array or string, based on the provided parameter
 */
function shuffle (src) {
  const copy = [...src]

  const length = copy.length
  for (let i = 0; i < length; i++) {
    const x = copy[i]
    const y = Math.floor(Math.random() * length)
    const z = copy[y]
    copy[i] = z
    copy[y] = x
  }

  if (typeof src === 'string') {
    return copy.join('')
  }

  return copy
}

const suits = ['clubs', 'diamonds', 'hearts', 'spades']
const ranks = [2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K', 'A']

/**********************************************
 * YOUR CODE BELOW
 **********************************************/

const deck = []

for (const suit of suits) {
  for (const rank of ranks) {
    deck.push({ suit, rank })
  }
}

const game = {
  selectedCards: [],
  cards: []
}

const $hand = document.getElementById('hand')
const $draw = document.getElementById('draw')
const $controls = document.getElementById('controls')

function deal (numberOfCards = 5) {
  game.selectedCards = []
  game.cards = shuffle(deck)

  const hand = game.cards.splice(0, numberOfCards)

  $hand.innerHTML = hand.map(card => `
    <div class="card" data-card="${card.rank} of ${card.suit}">
      <div class="number ${card.suit}">${card.rank}</div>
      <div class="suit"><img src="images/${card.suit}.png"></div>
      <div class="number ${card.suit}">${card.rank}</div>
    </div>`).join('')
}

function draw () {
  if (game.selectedCards.length > 0) {
    const $cards = $hand.querySelectorAll('.selected')

    for (const card of $cards) {
      const newCard = game.cards.splice(0, 1)[0]

      card.innerHTML = `
        <div class="number ${newCard.suit}">${newCard.rank}</div>
        <div class="suit"><img src="images/${newCard.suit}.png"></div>
        <div class="number ${newCard.suit}">${newCard.rank}</div>`
      card.classList.remove('selected')
    }

    game.selectedCards = []
  }
}

$hand.addEventListener('click', function (event) {
  const card = event.target.closest('.card')
  if (card) {
    if (card.classList.contains('selected')) {
      card.classList.remove('selected')
      game.selectedCards.splice(game.selectedCards.indexOf(card.dataset.card), 1)
    } else if (game.selectedCards.length < 3) {
      card.classList.add('selected')
      game.selectedCards.push(card.dataset.card)
    }
  }
})

$draw.addEventListener('click', draw)

$controls.addEventListener('click', function (event) {
  if (event.target.dataset.deal) {
    deal(event.target.dataset.deal)
  }
})
