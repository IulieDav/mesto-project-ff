// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;
const placesList = document.querySelector('.places__list');
// @todo: DOM узлы

// @todo: Функция создания карточки
function createCard(image, title, deleteFunction) {
    const card = cardTemplate.querySelector('.places__item').cloneNode(true);
    card.querySelector('.card__image').src = image;
    card.querySelector('.card__image').alt = title;
    card.querySelector('.card__title').textContent = title;

    const deleteButton = card.querySelector('.card__delete-button')
    deleteButton.addEventListener('click', function () {
        deleteFunction(deleteButton)
    })
    return card
}

function addCard(card) {
    placesList.append(card);
}

// @todo: Функция удаления карточки
function deleteCard (deleteButton) {
    const card = deleteButton.closest('.places__item');
    card.remove();
}

// @todo: Вывести карточки на страницу
initialCards.forEach((item) => {
    let card = createCard(item.link, item.name, deleteCard);
    addCard(card, deleteCard)
})

