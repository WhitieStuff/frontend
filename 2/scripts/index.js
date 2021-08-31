let menu = document.querySelector('#menu')

let menuButton = document.querySelector('#menuButton')
menuButton.addEventListener('click', event => {
    menu.classList.toggle('hidden')
})