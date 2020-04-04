export default class eventDispatcher {
    _sender: any
    _listeners = []
    constructor(sender: any) {
      this._sender = sender;
    }
    attach(listener: any) {
      this._listeners.push(listener);
    }
    notify(args: any) {
      let index: number;
      for (index = 0; index < this._listeners.length; index += 1) {
          this._listeners[index](this._sender, args);
      }
    }
  }