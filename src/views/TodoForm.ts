import { Todo } from '../models/Todo';
import { TodoProps } from '../models/Todo.old';
import { View } from '../lib/views/View';

export class TodoForm extends View<Todo, TodoProps> {
  eventsMap(): { [key: string]: () => void } {
    return {
      'click:.add-task': this.onAddTask,
    };
  }

  onAddTask = (): void => {
    const input = this.parent.querySelector('.title') as HTMLInputElement;
    if (input) {
      const title = input.value;
      if (!title) return;

      this.model.trigger('add', {
        id: Math.floor(Math.random() * 100),
        title,
      });
      this.model.set({ title });
      this.model.save();
    }
  };

  template(): string {
    return `
      <div class="todo-input">
        <input class='title' type="text" placeholder="add task ..." />
        <button class="add-task">Add</button>
      </div>
    `;
  }
}
