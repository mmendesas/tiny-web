import { Todo } from '../models/Todo';
import { TodoProps } from '../models/Todo.old';
import { View } from './View';

export class TodoForm extends View<Todo, TodoProps> {
  eventsMap(): { [key: string]: () => void } {
    return {
      'click:.set-color': this.onSetColorClick,
      'click:.set-title': this.onSetTitleClick,
    };
  }

  onSetColorClick = (): void => {
    this.model.setRandomColor();
  };

  onSetTitleClick = (): void => {
    const input = this.parent.querySelector('.title') as HTMLInputElement;
    if (input) {
      const title = input.value;
      if (!title) return;
      this.model.set({ title });
    }
  };

  template(): string {
    return `
      <div>
        <input class="title" type="text" placeholder="add task ..." />
        <button class="set-color">Change Color</button>
        <button class="set-title">Set Title</button>
      </div>
    `;
  }
}
