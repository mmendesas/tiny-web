import { Todo } from './models/Todo';

const todo = new Todo({ title: 'new todo' });

console.log('beforre', todo.attributes.data);

todo.on('change', () => {
  console.log('change called', todo.attributes.data);
});

todo.set({ title: 'groosa' });
