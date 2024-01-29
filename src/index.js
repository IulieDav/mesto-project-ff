import './pages/index.css';
import {initialCards, createCard, deleteCard} from './scripts/cards';


const cardList = document.querySelector('.places__list');


// @todo: Вывести карточки на страницу
initialCards.forEach((item) => {
    const card = createCard(item, deleteCard);
    cardList.append(card)
  })
