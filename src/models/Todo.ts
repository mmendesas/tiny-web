import axios, { AxiosResponse } from 'axios';

interface TodoProps {
  id?: number;
  title?: string;
  color?: string;
  done?: boolean;
}

// type alias
type Callback = () => void;

const BASE_URL = 'http://localhost:3000/todos';

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

  // fetching system
  fetch(): void {
    axios
      .get(`${BASE_URL}/${this.get('id')}`)
      .then((response: AxiosResponse): void => {
        this.set(response.data);
      });
  }

  save(): void {
    const id = this.get('id');

    if (id) {
      // update
      axios.put(`${BASE_URL}/${id}`, this.data);
    } else {
      // create new one
      axios.post(`${BASE_URL}`, this.data);
    }
  }
}
