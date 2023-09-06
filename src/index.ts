import { Todo } from './models/Todo';
import { TodoForm } from './views/TodoForm';

const root = document.getElementById('root');
const todo = Todo.buildTodo({
  title: 'my task 001',
  color: 'cyan',
  done: false,
});

if (root) {
  const todoForm = new TodoForm(root, todo);
  todoForm.render();
}
