export default class Api {
  constructor(options) {
    this.baseUrl = options.baseUrl;
    this.headers = options.headers;
  }

  getUserInfo() {
    return fetch(`${this.baseUrl}/users/me`, {headers: this.headers})
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .then((data) => data);
  }

  getInitialCards() {
    return fetch(`${this.baseUrl}/cards`, {headers: this.headers})
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .then((data) => data.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt)));
  }

  editProfile(newData) {
    return fetch(`${this.baseUrl}/users/me`, {
      method: "PATCH",
      body: JSON.stringify({
        name: newData.userName,
        about: newData.userJob
      }), headers: this.headers
    });
  }

  addNewCard(card) {
    return fetch(`${this.baseUrl}/cards`, {
      method: "POST",
      body: JSON.stringify({
        name: card.name,
        link: card.link
      }), headers: this.headers
    });
  }

  deleteCard(cardId) {
    return fetch(`${this.baseUrl}/cards/${cardId}`, {
      method: "DELETE", headers: this.headers
    });
  }
}
