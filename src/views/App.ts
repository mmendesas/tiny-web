import { Collection } from '../lib/models/Collection';
import { View } from '../lib/views/View';
import { Todo } from '../models/Todo';
import { TodoProps } from '../models/Todo.old';
import { TodoForm } from './TodoForm';
import { TodoList } from './TodoList';

export class App extends View<Todo, TodoProps> {
  private todos: Collection<Todo, TodoProps> = [];

  initialize(): void {
    this.todos = new Collection(
      'http://localhost:3000/todos', //
      (json: TodoProps) => Todo.buildTodo(json)
    );

    this.todos.fetch();
    this.todos.on('change', () => {
      this.render();
    });

    // listen to actions from current model (Form)
    this.model.on('add', (payload: TodoProps | undefined): void => {
      this.todos.trigger('add', payload);
    });
  }

  regionsMap(): { [key: string]: string } {
    return {
      todoList: '.todo-list',
      todoForm: '.todo-form',
    };
  }

  onRender(): void {
    new TodoList(this.regions.todoList, this.todos).render();
    new TodoForm(this.regions.todoForm, this.model).render();
  }

  template(): string {
    return `
      <div class="todo-container">
        <h1>Example of Todo App</h1>
        <ul class='todo-list'></ul>
        <div class='todo-form'></div>
      </div>
    `;
  }
}
