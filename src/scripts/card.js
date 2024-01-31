// Функция создания карточки
export function createCard(item, deleteCard, openImageModal, likeCard) {
    const cardTemplate = document.querySelector('#card-template').content;
    const card = cardTemplate.querySelector('.card').cloneNode(true);
    const cardImage = card.querySelector('.card__image');
    const deleteButton = card.querySelector('.card__delete-button');
    const cardTitle = card.querySelector('.card__title');
    const likeButton = card.querySelector('.card__like-button');
  
    cardTitle.textContent = item.name;
    cardImage.src = item.link;
    cardImage.alt = item.name;
  
    deleteButton.addEventListener('click', function() {
        deleteCard(card) 
    })
  
    cardImage.addEventListener('click', function() {
      openImageModal(item)
    })
    
    likeButton.addEventListener('click', likeCard)
  
    return card
  }
  
  
  //Функция удаления карточки
  export function deleteCard(card) {
    card.remove()
  }
  
  //Функция лайка карточки
  export function likeCard(evt) {
    evt.target.classList.toggle('card__like-button_is-active')
  }