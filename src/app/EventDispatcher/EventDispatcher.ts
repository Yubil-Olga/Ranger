export default class EventDispatcher {
  private listeners: Array<Function>

  constructor() {
    this.listeners = [];
  }

  public attach(listener: Function) {
    this.listeners.push(listener);
  }

  public notify(args: any) {
    this.listeners.forEach((listener) => listener(args));
  }

  public unsubscribe(fn: Function) {
    this.listeners = this.listeners.filter((listener) => listener !== fn);
  }
}