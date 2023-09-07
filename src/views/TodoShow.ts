import { Todo } from '../models/Todo';
import { TodoProps } from '../models/Todo.old';
import { View } from '../lib/views/View';

export class TodoShow extends View<Todo, TodoProps> {
  template(): string {
    return `
      <ul>
        <li>
          <span>${this.model.get('title')}</span>
          <input class="done" type="checkbox">done?</input>

          <span style="font-weight: bold; padding: 5px 15px; margin-left: 10px;
            background-color:${this.model.get('color')}" />
        </li>
      </ul>
    `;
  }
}
