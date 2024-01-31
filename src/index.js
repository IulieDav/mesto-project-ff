import './pages/index.css';
import {initialCards} from './scripts/cards';
import {createCard, deleteCard, likeCard} from './scripts/card'
import {closeModal, openModal, closeOverlay} from './scripts/modal';


const cardList = document.querySelector('.places__list');
const popupEditProfile = document.querySelector('.popup_type_edit');
const profileEditButton = document.querySelector('.profile__edit-button');
const newCardModalWindow = document.querySelector('.popup_type_new-card');
const profileAddButton = document.querySelector('.profile__add-button');
const closeButton = document.querySelectorAll('.popup__close');
const imageModalWindow = document.querySelector('.popup_type_image');
const popup = document.querySelectorAll('.popup');
const formEditProfile = document.querySelector('[name="edit-profile"]');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_description');
const profileTitle = document.querySelector('.profile__title');
const profileDiscription = document.querySelector('.profile__description');
const formElementCard = document.querySelector('[name="new-place"]')
const nameInputCard = document.querySelector('.popup__input_type_card-name');
const urlInputCard = document.querySelector('.popup__input_type_url');
const imagePopup = document.querySelector('.popup__image');
const imagePopupCaption = document.querySelector('.popup__caption');

// @todo: Вывести карточки на страницу
initialCards.forEach((item) => {
    const card = createCard(item, deleteCard, openImageModal, likeCard);
    cardList.append(card)
  })


//Обработчик открытия попапов
profileEditButton.addEventListener('click', function() {
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileDiscription.textContent;
    openModal(popupEditProfile);
})

profileAddButton.addEventListener('click', function() {
    openModal(newCardModalWindow);
})

//Обработчик закрытия попапов
closeButton.forEach((item) => {
     item.addEventListener('click', function() {
        const popup = item.closest('.popup')
        closeModal(popup)
    })
})

////Закрытие попапа кликом на оверлей
popup.forEach((item) => {
    closeOverlay(item)
})

//Открытие попапа с картинкой
function openImageModal(card) {
    imagePopup.src = card.link;
    imagePopup.alt = card.name;
    imagePopupCaption.textContent = card.name;

    openModal(imageModalWindow)
}

//Функция и обработчик редактирования профиля
function editProfileFormSubmit(evt) {
    evt.preventDefault();

    profileTitle.textContent = nameInput.value ;
    profileDiscription.textContent = jobInput.value;

    closeModal(popupEditProfile)
}

formEditProfile.addEventListener('submit', editProfileFormSubmit); 
    

//Функция добавления карточки
function addCardFormSumbit(evt) {
    evt.preventDefault();

    const  newCard = {};
    newCard.name = nameInputCard.value;
    newCard.link = urlInputCard.value;

    const card = createCard(newCard, deleteCard, openImageModal, likeCard);
    cardList.prepend(card);

    closeModal(newCardModalWindow);

    nameInputCard.value = '';
    urlInputCard.value = '';
}

formElementCard.addEventListener('submit', addCardFormSumbit); 

//обработчик плавного открытия попапов
popup.forEach((item) => {
    item.classList.add('popup_is-animated');
})