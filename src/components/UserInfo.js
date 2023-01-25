export default class UserInfo {
  constructor(name, job, avatar) {
    this._name = name;
    this._job = job;
    this._avatar = avatar;
  }

  getUserInfo(data) {
    this._name.textContent = data.name;
    this._job.textContent = data.about;
    this._avatar.src = data.avatar;
  }

  setUserInfo(data) {
    this._name.textContent = data.name;
    this._job.textContent = data.about;
  }
}
