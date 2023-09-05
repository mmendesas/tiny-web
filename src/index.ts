import { Todo } from './models/Todo';

const todo = new Todo({ title: 'new todo' });

todo.events.on('change', () => {
  console.log('change called');
});

todo.events.trigger('change');
