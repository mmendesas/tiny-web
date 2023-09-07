import { TodoProps } from './Todo.old';

import { Model } from '../lib/models/Model';
import { Attributes } from '../lib/models/Attributes';
import { Events } from '../lib/models/Events';
import { Sync } from '../lib/models/Sync';
import { Collection } from '../lib/models/Collection';

const BASE_URL = 'http://localhost:3000/todos';

export class Todo extends Model<TodoProps> {
  static buildTodo(data: TodoProps): Todo {
    return new Todo(
      new Attributes<TodoProps>(data),
      new Events(), //
      new Sync<TodoProps>(BASE_URL)
    );
  }

  static buildCollection(): Collection<Todo, TodoProps> {
    return new Collection<Todo, TodoProps>(
      BASE_URL, //
      (json: TodoProps) => Todo.buildTodo(json)
    );
  }

  setRandomColor(): void {
    const color = Math.floor(Math.random() * 16777215).toString(16);
    this.set({ color: `#${color}` });
  }

  toogle(): void {
    this.set({ done: !this.get('done') });
  }
}
