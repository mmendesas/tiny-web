import { Todo } from './models/Todo';

const todo = new Todo({ title: 'new todo' });

todo.on('change', () => {
  console.log('change called');
});

todo.trigger('change');
