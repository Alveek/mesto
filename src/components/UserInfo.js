export default class UserInfo {
  constructor(name, job, avatar) {
    this._name = document.querySelector(name);
    this._job = document.querySelector(job);
    this._avatar = document.querySelector(avatar);
  }

  getUserInfo() {
    return {name: this._name.textContent, about: this._job.textContent};
  }

  setUserInfo(data) {
    this._name.textContent = data.name;
    this._job.textContent = data.about;
    this._avatar.src = data.avatar;
  }

  setUserAvatar(data) {
    this._avatar.src = data.avatarLink;
  }
}
