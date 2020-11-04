export default class EventDispatcher {
  private sender: any
  private listeners = []

  constructor(sender: object) {
    this.sender = sender;
  }

  public attach(listener: Function) {
    this.listeners.push(listener);
  }

  public notify(args: any) {
    this.listeners.forEach((listener) => listener(this.sender, args));
  }
}