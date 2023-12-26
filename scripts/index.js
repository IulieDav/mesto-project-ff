// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;
const placesList = document.querySelector('.places__list');
// @todo: DOM узлы



// @todo: Функция создания карточки
function addCard(image, title, deleteFunction) {
    const placesItem = cardTemplate.querySelector('.places__item').cloneNode(true);
    placesItem.querySelector('.card__image').src = image;
    placesItem.querySelector('.card__title').textContent = title;
    placesList.append(placesItem);
    const deleteButton = placesItem.querySelector('.card__delete-button')
    deleteButton.addEventListener('click', function () {
        deleteFunction(deleteButton)
    })
}

// @todo: Функция удаления карточки
function deleteCard (deleteButton) {
    const listItem = deleteButton.closest('.places__item');
    listItem.remove();
}

// @todo: Вывести карточки на страницу
initialCards.forEach((card) => {
    addCard(card.link, card.name, deleteCard)
})

