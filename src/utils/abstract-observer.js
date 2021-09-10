export default class AbstractObserver { // класс за которым будут все наблюдать
  constructor() {
    this._observers = new Set();
  }

  addObserver(observer) { // _handleModelEvent
    this._observers.add(observer);
  }

  removeObserver(observer) {
    this._observers.delete(observer);
  }

  // event - тип обновлений
  // payload - данные

  _notify(event, payload) {
    this._observers.forEach((observer) => observer(event, payload));
  }
}
