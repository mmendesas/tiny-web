import { Todo } from './models/Todo';

import { App } from './views/App';

const root = document.getElementById('root') as HTMLElement;
const todo = Todo.buildTodo({
  title: 'fake todo',
  done: false,
});

const app = new App(root, todo);
app.initialize();
