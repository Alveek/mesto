export default class Api {
  constructor({
    url,
    headers
  }) {
    this._url = url;
    this._headers = headers;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getUserInfo() {
    return fetch(`${this._url}/users/me`, { headers: this._headers })
      .then(res => this._checkResponse(res));
  }

  getInitialCards() {
    return fetch(`${this._url}/cards`, { headers: this._headers })
      .then(res => this._checkResponse(res));
  }

  editProfile(data) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      body: JSON.stringify({
        name: data.name,
        about: data.about
      }),
      headers: this._headers
    })
      .then(res => this._checkResponse(res));
  }

  addNewCard(card) {
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      body: JSON.stringify({
        name: card.name,
        link: card.link
      }),
      headers: this._headers
    })
      .then(res => this._checkResponse(res));

  }

  deleteCard(cardId) {
    return fetch(`${this._url}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers
    })
      .then(res => this._checkResponse(res));
  }

  likeCard(cardId) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: this._headers
    })
      .then(res => this._checkResponse(res));
  }

  unlikeCard(cardId) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: this._headers
    })
      .then(res => this._checkResponse(res));
  }

  updateAvatar(user) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      body: JSON.stringify({
        avatar: user.avatarLink
      }),
      headers: this._headers
    })
      .then(res => this._checkResponse(res));
  }

}

