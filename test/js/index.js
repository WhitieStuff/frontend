class CarouselButton {
    /**
     * Creates a button for the carousel.
     * @param {String} direction Left or Right.
     * @param {String} text Text within the button.
     */
    constructor (direction, text) {
        let button = document.createElement('button')
        button.classList.add('carousel__button-leaf')
        button.classList.add(`carousel__button-${direction}`)
        button.id = `carousel__button-${direction}`
        button.innerHTML = text

        carousel.appendChild(button)
        
        button.addEventListener('click', event => handleButtonClick(event))
    }
}

let carousel = document.querySelector('#carousel')
carousel.classList.add('carousel')
let cards = []

for (let i = 0; i < carousel.childNodes.length; i++) {
    if(carousel.childNodes[i].innerHTML) cards.push(carousel.childNodes[i])
}

let isWholeScreen = carousel.hasAttribute('screen')

let cardsSummary = cards.length
let cardsOnScreen = 0
let screens = []
let initialLeft = 0




countScreens()
styleCarousel()
drawScreen(0)

function drawScreen (screen) {
    // cards.forEach((card, index) => {
    //     card.style.display = "initial"
    // })
}

function handleButtonClick (event) {
    let direction = event.target.id.split('-')[1]
    moveCards(direction)
}

function moveCards (direction) {
    let move = cards[0].offsetWidth + 20
    if (direction === 'right') move *= -1
    if (isWholeScreen) move *= cardsOnScreen

    initialLeft += move

    cards.forEach(card => {
        card.style.visibility = "visible"
        card.offsetLeft += move
        card.style.left = `${initialLeft}px`
        if (card.offsetLeft < 50 || card.offsetLeft + card.offsetWidth > carousel.offsetWidth) card.style.visibility = "hidden"
    })
}

function countScreens () {
    let containerWidth = carousel.offsetWidth - 100
    let cardWidth = cards[0].offsetWidth + 20
    cardsOnScreen = Math.floor(containerWidth/cardWidth)

    // let screensSummary = Math.ceil(cardsSummary / cardsOnScreen)
    // let cardsCounted = 0
    // for (let i = 0; i < screensSummary; i++) {
    //     let screen = []
    //     for (let j = 0; j < cardsOnScreen; j++) {
    //         if (cardsCounted < cardsSummary) screen.push(cardsCounted++)
            
    //     }
    //     screens.push(screen)
    // }

    // console.log(`Cards summary: ${cardsSummary}`)
    // console.log(`Screens: ${screensSummary}`)
    // console.log(`Cards on screen: ${cardsOnScreen}`)
    // console.log(screens)
}

function styleCarousel () {
    let buttonLeft = new CarouselButton('left', '<')
    let buttonRight = new CarouselButton('right', '>')

    console.log((cards[0].offsetWidth + 20) * 6)
    console.log(cardsOnScreen)

    initialLeft = (carousel.offsetWidth - 100 - ((cards[0].offsetWidth + 20) * cardsOnScreen - 20)) / 2

    let style = document.createElement('style')
    style.innerHTML = `
        .carousel {
            position: relative;
            padding: 0 50px;
            display: flex;
            flex-direction: row;
            gap: 20px;
            overflow: hidden;
        }

        .carousel__button-leaf {
            position: absolute;
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

        .carousel__button-leaf:hover, .carousel__button-leaf:focus {
            color: #333;
        }

        .carousel__button-left {
            left: 0;
        }

        .carousel__button-right {
            right: 0;
        }

        .carousel__card {
            position: relative;
            left: ${initialLeft}px;
            transition: .5s left;
        }
    `

    document.querySelector('head').appendChild(style)

    cards.forEach(card => {
        if (card.offsetLeft < 0 || card.offsetLeft + card.offsetWidth > carousel.offsetWidth) card.style.visibility = "hidden"
    })
}