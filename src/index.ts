import { Todo } from './models/Todo';

const todo = new Todo({ id: 1 });

console.log('beforre', todo.attributes.data);

todo.on('change', () => {
  console.log('change called', todo.attributes.data);
});

todo.fetch();
