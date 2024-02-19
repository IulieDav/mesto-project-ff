import './pages/index.css';
import {createCard, deleteCard, likeCard} from './scripts/card'
import {closeModal, openModal, closeOverlay} from './scripts/modal';
import {enableValidation, clearValidation} from './scripts/validation';
import {getUserInfoFromServer, getCardsFromServer, createProfileOnServer, createCardOnServer, changeAvatarOnServer} from './scripts/api';


const cardList = document.querySelector('.places__list');
const popupNewAvatar = document.querySelector('.popup_type_new-avatar');
const popupEditProfile = document.querySelector('.popup_type_edit');
const profileEditButton = document.querySelector('.profile__edit-button');
const newCardModalWindow = document.querySelector('.popup_type_new-card');
const profileAddButton = document.querySelector('.profile__add-button');
const closeButton = document.querySelectorAll('.popup__close');
const imageModalWindow = document.querySelector('.popup_type_image');
const popup = document.querySelectorAll('.popup');
const formChangeAvatar = document.querySelector('[name="new-avatar"]');
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

//загрузкa данных пользователя и карточек с сервера и добавление их в DOM
 Promise.all([getUserInfoFromServer(), getCardsFromServer()])
 .then(([userInfo, cardsArray]) => {
    
    userId = userInfo._id;

    profileTitle.textContent = userInfo.name;
    profileDiscription.textContent = userInfo.about;
    profileImage.style.backgroundImage = `url(${userInfo.avatar})`;

    cardsArray.forEach((item) => {
       const card = createCard(item, deleteCard, openImageModal, likeCard, userId);
        cardList.append(card);
    })
 })
 .catch((err) => {
    console.log(err);
});


//Функция-обработчик click смены аватара
function handleChangeAvatarButtonClick() {
    clearValidation(popupNewAvatar, validationConfig);
    openModal(popupNewAvatar);
}
profileImage.addEventListener('click', handleChangeAvatarButtonClick)


//Функция-обработчик click редактирования профиля
function handleEditProfileButtonClick() {
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileDiscription.textContent;
    clearValidation(popupEditProfile, validationConfig);
    openModal(popupEditProfile);
}

profileEditButton.addEventListener('click', handleEditProfileButtonClick)


//Функция-обработчик click добавления карточки
function handleAddCardButtonClick() {
    clearValidation(newCardModalWindow, validationConfig);
    openModal(newCardModalWindow); 
}
profileAddButton.addEventListener('click', handleAddCardButtonClick)


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


//Функция воспроизведения процесса загрузки
function renderLoading(formElement, isLoading) {
    const saveButton = formElement.querySelector('.popup__button');
    if(isLoading) {
        saveButton.textContent = 'Сохранение...';
    } else {
        saveButton.textContent = 'Сохранить';
    }
}


//Функция-обработчик submit смены аватара
function handleChangeAvatarFormSubmit(evt) {
    evt.preventDefault();

    const newAvatar = {};
    newAvatar.avatar = avatarInput.value;

    renderLoading(formChangeAvatar,true)

    changeAvatarOnServer(newAvatar)
    .then((res) => {
        profileImage.style.backgroundImage = `url(${res.avatar})`;
    })
    .catch((err) => {
        console.log(err);
    })
    .finally(() => {
        renderLoading(formChangeAvatar, false);
    })

    closeModal(popupNewAvatar);
}

formChangeAvatar.addEventListener('submit', handleChangeAvatarFormSubmit)


//Функция-обработчик submit редактирования профиля
function handleEditProfileFormSubmit(evt) {
    evt.preventDefault();

    const {name, description} = evt.currentTarget.elements;

    renderLoading(formEditProfile, true)

    createProfileOnServer({
        name: name.value,
        about: description.value
    })
    .then((res) => {
        profileTitle.textContent = res.name;
        profileDiscription.textContent = res.about;
    })
    .catch((err) => {
        console.log(err);
    })
    .finally(() => {
        renderLoading(formEditProfile, false);
    })

    closeModal(popupEditProfile)
}

formEditProfile.addEventListener('submit', handleEditProfileFormSubmit); 
    

//Функция-обработчик submit добавления карточки
function handleAddCardFormSumbit(evt) {
    evt.preventDefault();

    const  newCard = {};
    newCard.name = nameInputCard.value;
    newCard.link = urlInputCard.value;

    renderLoading(formElementCard, true)

    createCardOnServer(newCard)
    .then((cardData) => {
        const card = createCard(cardData, deleteCard, openImageModal, likeCard, userId);
        cardList.prepend(card);
    })
    .catch((err) => {
        console.log(err);
    })
    .finally(() => {
        renderLoading(formElementCard, false);
    })

    closeModal(newCardModalWindow);

    formElementCard.reset();
}

formElementCard.addEventListener('submit', handleAddCardFormSumbit); 

//обработчик плавного открытия попапов
popup.forEach((item) => {
    item.classList.add('popup_is-animated');
})