//функция открытия модального окна
export function openModal(popup) {
    popup.classList.add('popup_is-opened');
    //popup.classList.add('popup_is-animated');

    document.addEventListener('keydown', closeEscape)
}

//функция закрытия модального окна
export function closeModal(popup) {
    popup.classList.remove('popup_is-opened');

    document.removeEventListener('keydown', closeEscape)
}

//функция-обработчик события нажатия Esc
function closeEscape(evt) {
    if(evt.key === 'Escape') {
        const openedPopup = document.querySelector('.popup_is-opened');
        closeModal(openedPopup)
    }
}

//функция-обработчик события клика по оверлею
export function closeOverlay(popup) {
    popup.addEventListener('click', function(evt) {
        const openedPopup = document.querySelector('.popup_is-opened');
        if(evt.target.classList.contains('popup')) {
            closeModal(openedPopup);
        }
    }) 
}
