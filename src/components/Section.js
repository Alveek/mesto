export default class Section {
  constructor({data, renderer}, containerSelector) {
    this._renderedItems = data;
    this._renderer = renderer;
    this._container = containerSelector;
  }

  addItem(element) {
    this._container.prepend(element);
  }

  renderItems() {
    this._renderedItems.then((cards) =>
      cards.forEach((card) => {
        this._renderer(card);
      })
    );
  }

  // renderItems() {
  //   this._renderedItems.forEach((card) => {
  //     this._renderer(card);
  //   });
  // }

}


