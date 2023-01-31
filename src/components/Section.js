export default class Section {
  constructor({ renderer }, containerSelector) {
    // this._renderedItems = data;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  addItem(element) {
    this._container.prepend(element);
  }

  renderItems(cards, myId) {
    cards.forEach((card) => {
      this._renderer(card, myId);
    });
  }

}


