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

//https://assets-us-01.kc-usercontent.com/500e0a65-283d-00ef-33b2-7f1f20488fe2/f12ddbcf-c21e-45eb-8c21-cce51e7ac775/peppa_pig_splat.png
//https://static1.personality-database.com/profile_images/08a8cc35c5ad4555aff4ac60758d8511.png
//https://i.ibb.co/9c1sXrj/avatar.jpg
