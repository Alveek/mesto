export default class Api {
  constructor(options) {
    this.baseUrl = options.baseUrl;
    this.headers = options.headers;
  }

  async getInitialCards() {
    const res = await fetch(`${this.baseUrl}/cards`, { headers: this.headers });
    return await res.json();
  }

  getUserInfo() {
    return fetch(`${this.baseUrl}/users/me`, { headers: this.headers })
      .then((res) => res.json())
      .then((data) => data);
  }

  // getInitialCards() {
  //   return fetch(`${this.baseUrl}/cards`, { headers: this.headers })
  //     .then((res) => res.json())
  //     .then((data) => data);
  // }
}
