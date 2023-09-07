import { Todo } from '../models/Todo';
import { TodoProps } from '../models/Todo.old';
import { TodoForm } from './TodoForm';
import { TodoShow } from './TodoShow';

import { View } from '../lib/views/View';

export class TodoContainer extends View<Todo, TodoProps> {
  regionsMap(): { [key: string]: string } {
    return {
      todoShow: '.todo-show',
      todoForm: '.todo-form',
    };
  }

  onRender(): void {
    new TodoShow(this.regions.todoShow, this.model).render();
    new TodoForm(this.regions.todoForm, this.model).render();
  }

  template(): string {
    return `
      <div>
        <div class="todo-show"></div>
        <div class="todo-form"></div>
      </div>
    `;
  }
}
