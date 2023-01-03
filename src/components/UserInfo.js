export default class UserInfo {
  constructor(name, job) {
    this._name = name;
    this._job = job;
  }

  getUserInfo() {
    return {userName: this._name.textContent, userJob: this._job.textContent};
  }

  setUserInfo(data) {
    this._name.textContent = data.userName;
    this._job.textContent = data.userJob;
  }
}
