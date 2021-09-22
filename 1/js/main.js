let menu = document.querySelector('#menu')
let toggleMenu = document.querySelector('#toggleMenu')

toggleMenu.addEventListener('click', event => {
    menu.classList.toggle('mobile-hidden')
})