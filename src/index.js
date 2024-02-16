import './pages/index.css';
import {initialCards} from './scripts/cards';
import {createCard, deleteCard, likeCard} from './scripts/card'
import {closeModal, openModal, closeOverlay} from './scripts/modal';
import {enableValidation, clearValidation} from './scripts/validation';
import {getUserInfoFromServer, getCardsFromServer, createProfileOnServer, createCardOnServer, deleteCardOnServer, putLikeOnServer, deleteLikeOnServer,changeAvatarOnServer} from './scripts/api';


const cardList = document.querySelector('.places__list');
const popupNewAvatar = document.querySelector('.popup_type_new-avatar');
const newAvatarEditButton = document.querySelector('.profile__image-edit-button');
const popupEditProfile = document.querySelector('.popup_type_edit');
const profileEditButton = document.querySelector('.profile__edit-button');
const newCardModalWindow = document.querySelector('.popup_type_new-card');
const profileAddButton = document.querySelector('.profile__add-button');
const closeButton = document.querySelectorAll('.popup__close');
const imageModalWindow = document.querySelector('.popup_type_image');
const popup = document.querySelectorAll('.popup');
const formchangeAvatar = document.querySelector('[name="new-avatar"]');
const avatarInput = document.querySelector('.popup__input_type_url_avatar');
const formEditProfile = document.querySelector('[name="edit-profile"]');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_description');
const profileTitle = document.querySelector('.profile__title');
const profileDiscription = document.querySelector('.profile__description');
const profileImage = document.querySelector('.profile__image');
const formElementCard = document.querySelector('[name="new-place"]')
const nameInputCard = document.querySelector('.popup__input_type_card-name');
const urlInputCard = document.querySelector('.popup__input_type_url');
const imagePopup = document.querySelector('.popup__image');
const imagePopupCaption = document.querySelector('.popup__caption');
const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
};

let userId;


enableValidation(validationConfig);

//загрузки данных пользователя и карточек и добавление их в DOM
 Promise.all([getUserInfoFromServer(), getCardsFromServer()])
 .then((res) => {
    const userInfo = res[0];
    const cardsArray = res[1];
    userId = userInfo._id;

    profileTitle.textContent = userInfo.name;
    profileDiscription.textContent = userInfo.about;
    profileImage.style.backgroundImage = `url(${userInfo.avatar})`;

    cardsArray.forEach((item) => {
       const card = createCard(item, deleteCard, openImageModal, likeCard, userId);
        cardList.append(card);
    })
 })
 

//Обработчик открытия попапов
profileEditButton.addEventListener('click', function() {
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileDiscription.textContent;
    clearValidation(popupEditProfile, validationConfig);
    openModal(popupEditProfile);
})

profileAddButton.addEventListener('click', function() {
    clearValidation(newCardModalWindow, validationConfig);
    openModal(newCardModalWindow);  
})

newAvatarEditButton.addEventListener('click', function() {
    clearValidation(popupNewAvatar, validationConfig);
    openModal(popupNewAvatar);
})

//Обработчик закрытия попапов
closeButton.forEach((item) => {
     item.addEventListener('click', function() {
        const popup = item.closest('.popup')
        closeModal(popup);
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


//Функция и обработчик смены аватара
function changeAvatarFormSubmit(evt) {
    evt.preventDefault();

    const newAvatar = {};
    newAvatar.avatar = avatarInput.value;

    changeAvatarOnServer(newAvatar)
    .then((res) => {
        profileImage.style.backgroundImage = `url(${res.avatar})`;
    })

    closeModal(popupNewAvatar);
}

formchangeAvatar.addEventListener('submit', changeAvatarFormSubmit)


function renderLoading(isLoading) {
    const saveButton = formEditProfile.querySelector('.popup__button');
    if(isLoading) {
        saveButton.textContent = 'Сохранение...';
    } else {
        saveButton.textContent = 'Сохранить';
    }
}

//Функция и обработчик редактирования профиля
function editProfileFormSubmit(evt) {
    evt.preventDefault();

    const {name, description} = evt.currentTarget.elements;

    renderLoading(true)

    createProfileOnServer({
        name: name.value,
        about: description.value
    })
    .then((res) => {
        profileTitle.textContent = res.name;
        profileDiscription.textContent = res.about;
    })
    .finally(() => {
        renderLoading(false);
    })

    closeModal(popupEditProfile)
}

formEditProfile.addEventListener('submit', editProfileFormSubmit); 
    

//Функция добавления карточки
function addCardFormSumbit(evt) {
    evt.preventDefault();

    const  newCard = {};
    newCard.name = nameInputCard.value;
    newCard.link = urlInputCard.value;

    createCardOnServer(newCard)
    .then((cardData) => {
        const card = createCard(cardData, deleteCard, openImageModal, likeCard, userId);
        cardList.prepend(card);
    })

    closeModal(newCardModalWindow);

    nameInputCard.value = '';
    urlInputCard.value = '';
}

formElementCard.addEventListener('submit', addCardFormSumbit); 

//обработчик плавного открытия попапов
popup.forEach((item) => {
    item.classList.add('popup_is-animated');
})