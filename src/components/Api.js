export default class Api {
  constructor({url, headers}) {
    this._url = url;
    this._headers = headers;
    console.log(this._url, this._headers)
  }

  getUserInfo() {
    return fetch(`${this._url}/users/me`, {headers: this._headers})
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .then((data) => data);
  }

  getInitialCards() {
    return fetch(`${this._url}/cards`, {headers: this._headers})
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .then((data) => data.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt)));
  }

  editProfile(newData) {
    return fetch(`${this._url}/users/me`, {
      method: "PATCH",
      body: JSON.stringify({
        name: newData.userName,
        about: newData.userJob
      }), headers: this._headers
    });
  }

  addNewCard(card) {
    return fetch(`${this._url}/cards`, {
      method: "POST",
      body: JSON.stringify({
        name: card.name,
        link: card.link
      }), headers: this._headers
    });
  }

  deleteCard(cardId) {
    return fetch(`${this._url}/cards/${cardId}`, {
      method: "DELETE", headers: this._headers
    });
  }
}
