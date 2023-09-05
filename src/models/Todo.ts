import axios, { AxiosResponse } from 'axios';
import { Events } from './Events';

interface TodoProps {
  id?: number;
  title?: string;
  color?: string;
  done?: boolean;
}

const BASE_URL = 'http://localhost:3000/todos';

export class Todo {
  events: Events = new Events();

  constructor(private data: TodoProps) {}

  get(key: string): string | number {
    return this.data[key];
  }

  set(update: TodoProps): void {
    Object.assign(this.data, update);
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
