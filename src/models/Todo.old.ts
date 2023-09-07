import { AxiosResponse } from 'axios';
import { Attributes } from '../lib/models/Attributes';
import { Events } from '../lib/models/Events';
import { Sync } from '../lib/models/Sync';

export interface TodoProps {
  id?: number;
  title?: string;
  color?: string;
  done?: boolean;
}

const BASE_URL = 'http://localhost:3000/todos';

export class TodoOld {
  public events: Events = new Events();
  public sync: Sync<TodoProps> = new Sync<TodoProps>(BASE_URL);
  public attributes: Attributes<TodoProps>;

  constructor(data: TodoProps) {
    this.attributes = new Attributes<TodoProps>(data);
  }

  get on() {
    return this.events.on;
  }

  get trigger() {
    return this.events.trigger;
  }

  get get() {
    return this.attributes.get;
  }

  set(update: TodoProps): void {
    this.attributes.set(update);
    this.events.trigger('change');
  }

  fetch(): void {
    const id = this.get('id');
    if (typeof id !== 'number') {
      throw new Error('Cannot fetch without id');
    }

    this.sync
      .fetch(id) //
      .then((response: AxiosResponse): void => {
        this.set(response.data);
      });
  }

  save(): void {
    this.sync
      .save(this.attributes.getAll())
      .then((response: AxiosResponse): void => {
        this.trigger('save');
      })
      .catch(() => {
        this.trigger('error');
      });
  }
}
