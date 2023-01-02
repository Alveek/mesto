import Popup from "./Popup.js";
import {popupImage, popupImageText} from "../utils/constants.js";

export default class PopupWithImage extends Popup {
  constructor({popupSelector}) {
    super({popupSelector});
  }

  open(name, link) {
    popupImage.src = link;
    popupImageText.textContent = name;
    popupImage.alt = name;

    super.open();
  }
}
