import { Attributes } from './Attributes';
import { Events } from './Events';
import { Sync } from './Sync';

export interface TodoProps {
  id?: number;
  title?: string;
  color?: string;
  done?: boolean;
}

const BASE_URL = 'http://localhost:3000/todos';

export class Todo {
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
}
