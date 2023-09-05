import { Todo } from './models/Todo';

const todo = new Todo({
  title: 'something 001',
  done: false,
  color: 'red',
});

console.log(todo.get('title'));
console.log(todo.set({ color: 'green' }));

console.log(todo);
