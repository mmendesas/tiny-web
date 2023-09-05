import { Todo } from './models/Todo';

const todo = new Todo({
  title: 'something 001',
  done: false,
  color: 'red',
});

todo.on('change', () => {
  console.log('changed >>', todo.data);
});

console.log('before >> ', todo.data);

todo.set({ title: 'new title' });
todo.trigger('change');
