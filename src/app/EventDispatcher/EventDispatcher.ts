export default class EventDispatcher {
  private sender: any
  private listeners = []

  constructor(sender: any) {
    this.sender = sender;
  }

  public attach(listener: any) {
    this.listeners.push(listener);
  }

  public notify(args: any) {
    let index: number;
    for (index = 0; index < this.listeners.length; index += 1) {
      this.listeners[index](this.sender, args);
    }
  }
}