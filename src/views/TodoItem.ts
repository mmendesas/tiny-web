import { View } from '../lib/views/View';
import { Todo } from '../models/Todo';
import { TodoProps } from '../models/Todo.old';

export class TodoItem extends View<Todo, TodoProps> {
  eventsMap(): { [key: string]: () => void } {
    return {
      'click:.finished': this.onToggleClick,
      'click:.remove': this.onDeleteClick,
    };
  }

  onToggleClick = (): void => {
    this.model.toogle();
  };

  onDeleteClick = (): void => {
    this.model.trigger('delete');
  };

  template(): string {
    const done = !!this.model.get('done');

    return `
      <li class="todo-item">
        <span class="${done ? 'line' : ''}">${this.model.get('title')}</span>
        <span class="finished">finished</span>
        <span class="remove">delete</span>
      </li>
    `;
  }
}
