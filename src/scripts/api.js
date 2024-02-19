const config = {
    baseUrl: 'https://nomoreparties.co/v1/wff-cohort-6',
    headers: {
    authorization: 'c6a15e87-02b7-4c9d-85b0-7d680e75fbf0',
    'Content-Type': 'application/json'
    }
}


//функция проверки результата запроса
const handleResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
}


// Функция загрузки информации о пользователе с сервера
export const getUserInfoFromServer = () => {
    return fetch(`${config.baseUrl}/users/me`, {
        headers: config.headers
      })
      .then(handleResponse)
}


// Функция загрузки карточек с сервера
export const getCardsFromServer = () => {
    return fetch(`${config.baseUrl}/cards`, {
        headers: config.headers
      })
      .then(handleResponse)
}

//Функция редактирование профиля на сервере
export const createProfileOnServer = (newProfile) => {
    return fetch(`${config.baseUrl}/users/me`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            name: newProfile.name,
            about: newProfile.about
        })
    })
    .then(handleResponse)    
}

//Функция создания карточек на сервере
export const createCardOnServer = (newCard) => {
    return fetch(`${config.baseUrl}/cards`, {
        method: 'POST',
        headers: config.headers,
        body: JSON.stringify({
            name: newCard.name,
            link: newCard.link
        })
    })
    .then(handleResponse)
}

//Функция удаления карточек на сервере
export const deleteCardOnServer = (cardId) => {
    return fetch(`${config.baseUrl}/cards/${cardId}`, {
        method: 'DELETE',
        headers: config.headers
    })
    .then(handleResponse) 
}

//Функция добавления лайка на сервере
export const putLikeOnServer = (cardId) => {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
        method: 'PUT',
        headers: config.headers
    })
    .then(handleResponse)
}

//Функция удаления лайка на сервере
export const deleteLikeOnServer = (cardId) => {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
        method: 'DELETE',
        headers: config.headers
    })
    .then(handleResponse)
}

//Функция изменения аватара на сервере
export const changeAvatarOnServer = (newAvatar) => {
    return fetch(`${config.baseUrl}/users/me/avatar`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            avatar: newAvatar.avatar,
        })
    })
    .then(handleResponse)     
}