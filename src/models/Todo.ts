interface TodoProps {
  title?: string;
  color?: string;
  done?: boolean;
}

// type alias
type Callback = () => void;

export class Todo {
  events: { [key: string]: Callback[] } = {};

  constructor(private data: TodoProps) {}

  get(key: string): string | number {
    return this.data[key];
  }

  set(update: TodoProps): void {
    Object.assign(this.data, update);
  }

  // events
  on(eventName: string, callback: Callback): void {
    const handlers = this.events[eventName] || [];
    handlers.push(callback);

    this.events[eventName] = handlers;
  }

  trigger(eventName: string): void {
    const handlers = this.events[eventName];
    if (!handlers || handlers.length === 0) return;

    handlers.forEach((cb: Callback) => cb());
  }
}
