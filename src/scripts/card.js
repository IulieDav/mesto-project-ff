import { deleteLikeOnServer,putLikeOnServer, deleteCardOnServer } from "./api";

const cardTemplate = document.querySelector('#card-template').content;

// Функция создания карточки
export function createCard(cardData, deleteCard, openImageModal, likeCard, userId) {
    const card = cardTemplate.querySelector('.card').cloneNode(true);
    const cardImage = card.querySelector('.card__image');
    const deleteButton = card.querySelector('.card__delete-button');
    const cardTitle = card.querySelector('.card__title');
    const likeButton = card.querySelector('.card__like-button');
    const likeCounter = card.querySelector('.card__like-counter');
  
    cardTitle.textContent = cardData.name;
    cardImage.src = cardData.link;
    cardImage.alt = cardData.name;

    if((cardData.owner._id === userId)) {
      deleteButton.style.display = 'block'; 
    } else {
      deleteButton.style.display = 'none';
    }
  
    deleteButton.addEventListener('click', function() {
        deleteCard(card, cardData) 
    });
  
    cardImage.addEventListener('click', function() {
      openImageModal(cardData)
    });
    
    likeButton.addEventListener('click', function(evt) {
      likeCard(evt, cardData, likeCounter)
    });

    updateLikes(cardData.likes.length, likeCounter);

    if(cardData.likes.find((like) => like._id === userId)) {
      likeButton.classList.add('card__like-button_is-active')
    }

    return card
  }
  
  
  //Функция удаления карточки
  export function deleteCard(card, cardData) {
    deleteCardOnServer(cardData._id)
    .then(card.remove())
    .catch((err) => {
      console.log(err);
    })
  }
  
  //Функция лайка карточки
  export function likeCard(evt, cardData, likeCounter) {
    evt.target.classList.toggle('card__like-button_is-active');
    if(evt.target.classList.contains('card__like-button_is-active')) {
      putLikeOnServer(cardData._id)
      .then((res) => {
        updateLikes(res.likes.length, likeCounter);
      })
      .catch((err) => {
        console.log(err);
      })
    } else {
      deleteLikeOnServer(cardData._id)
      .then((res) => {
        updateLikes(res.likes.length, likeCounter)
      })
      .catch((err) => {
        console.log(err);
      })
    }
  }

  function updateLikes(count, likeCounter) {
    if(count) {
      likeCounter.textContent = count;
    } else {
      likeCounter.textContent = '';
    }
  }