import { Todo } from './models/Todo';
import { TodoContainer } from './views/TodoContainer';

const root = document.getElementById('root');
const todo = Todo.buildTodo({
  title: 'my task 001',
  color: 'cyan',
  done: false,
});

if (root) {
  const container = new TodoContainer(root, todo);
  container.render();
}
