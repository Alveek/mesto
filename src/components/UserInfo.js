import {profileJobText, profileNameText} from "../utils/constants.js";

export default class UserInfo {
  constructor(name, job) {
    this._name = name;
    this._job = job;
  }

  getUserInfo() {
    return {userName: this._name.textContent, userJob: this._job.textContent};
  }

  setUserInfo(name, job) {
    this._name.textContent = name;
    this._job.textContent = job;
  }
}
