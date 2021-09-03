class sliderButton {
    /**
     * Creates a button for the slider.
     * @param {String} direction Left or Right.
     * @param {String} text Text within the button.
     */
    constructor(direction, text) {
        let button = document.createElement('button')
        button.classList.add('w-slider__button-leaf')
        button.classList.add(`w-slider__button-${direction}`)
        button.id = `w-slider__button-${direction}`
        button.innerHTML = text

        slider.appendChild(button)

        button.addEventListener('click', event => handleButtonClick(event))
    }
}

let slider = document.querySelector('#w-slider')
slider.classList.add('w-slider')

let container
let cards = []

let isMultiple = slider.hasAttribute('multiple')
let isInfinite = slider.hasAttribute('infinite')

let cardsSummary = cards.length
let cardsOnScreen = 0
let screens = []
let initialLeft = 0



createContainer()
countCards()
countScreens()
drawslider()

function createContainer() {
    container = document.createElement('div')
    container.id = 'w-slider__container'
    container.classList.add('w-slider__container')

    let inner = slider.innerHTML
    slider.innerHTML = ''

    container.innerHTML = inner
    slider.appendChild(container)
}

function countCards() {
    for (let i = 0; i < container.childNodes.length; i++) {
        card = container.childNodes[i]
        if (card.innerHTML) {
            card.classList.add('w-slider__card')
            cards.push(card)
        }
    }

}


function handleButtonClick(event) {
    let direction = event.target.id.split('-')[2]
    moveCards(direction)
}

function moveCards(direction) {
    console.log(direction, cards[0].style.visibility)
    if (direction === 'left' && cards[0].style.visibility === 'visible') return
    if (direction === 'right' && cards[cards.length - 1].style.visibility === 'visible') return

    let move = cards[0].offsetWidth + 20
    if (direction === 'right') move *= -1
    if (isMultiple) move *= cardsOnScreen

    initialLeft += move

    showAllCards()

    cards.forEach(card => {
        card.offsetLeft += move
        card.style.left = `${initialLeft}px`
    })

    let overflowTimeout = setTimeout(hideOverflow, 400)
}

function countScreens() {
    let sliderWidth = slider.offsetWidth - 100
    let cardWidth = cards[0].offsetWidth + 20
    cardsOnScreen = Math.floor(sliderWidth / cardWidth)
}

function drawslider() {
    let buttonLeft = new sliderButton('left', '<')
    let buttonRight = new sliderButton('right', '>')

    initialLeft = 0
    let containerWidth = (cards[0].offsetWidth + 20) * cardsOnScreen - 20

    let style = document.createElement('style')
    style.innerHTML = `
        .w-slider {
            position: relative;
            padding: 0 50px;
        }

        .w-slider__container {
            position: relative;
            margin: auto;
            width: ${containerWidth}px;
            display: flex;
            flex-direction: row;
            gap: 20px;
            overflow: hidden;
        }

        .w-slider__button-leaf {
            position: absolute;
            top: 0;
            width: 50px;
            height: 100%;
            background: transparent;
            text-align: center;
            font-family: "Courier New";
            font-size: 50px;
            font-weight: bold;
            color: #666;
            border: none;
            outline: none;
            appearance: none;
            cursor: pointer;
        }

        .w-slider__button-leaf:hover, .slider__button-leaf:focus {
            color: #333;
        }

        .w-slider__button-left {
            left: 0;
        }

        .w-slider__button-right {
            right: 0;
        }

        .w-slider__card {
            position: relative;
            left: ${initialLeft}px;
            transition: .4s left;
        }
    `

    document.querySelector('head').insertBefore(style, document.querySelector('link'))

    hideOverflow()
}

function showAllCards() {
    cards.forEach(card => {
        card.style.visibility = "visible"
    })
}

function hideOverflow() {
    cards.forEach(card => {
        card.style.visibility = "visible"
        if (card.offsetLeft < 0 || card.offsetLeft + card.offsetWidth > slider.offsetWidth) card.style.visibility = "hidden"
    })
}