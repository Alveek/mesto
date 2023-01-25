export default class Section {
  constructor({ data, renderer }, containerSelector) {
    this._renderedItems = data;
    this._renderer = renderer;
    this._container = containerSelector;
  }

  addItem(element) {
    this._container.prepend(element);
  }

  // async renderItems() {
  //   const cards = await this._renderedItems;

  //   cards.forEach((item) => {
  //     this._renderer(item);
  //   });
  // }

  renderItems() {
    this._renderedItems.then((cards) =>
      cards.forEach((card) => {
        this._renderer(card);
      })
    );
  }
}
