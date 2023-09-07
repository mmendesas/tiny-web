// type alias
type Callback = () => void;

export class Events {
  events: { [key: string]: Callback[] } = {};

  // events
  on = (eventName: string, callback: Callback): void => {
    const handlers = this.events[eventName] || [];
    handlers.push(callback);

    this.events[eventName] = handlers;
  };

  trigger = (eventName: string): void => {
    const handlers = this.events[eventName];
    if (!handlers || handlers.length === 0) return;

    handlers.forEach((cb: Callback) => cb());
  };
}
