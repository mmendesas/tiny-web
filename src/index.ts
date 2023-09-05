import { TodoForm } from './views/TodoForm';

const root = document.getElementById('root');

if (root) {
  console.log('asdfds');
  const todoForm = new TodoForm(root);
  todoForm.render();
}
