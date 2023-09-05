import { Todo } from './models/Todo';

const todo = Todo.buildTodo({ id: 1 });

todo.on('change', () => {
  console.log(todo);
});

todo.fetch();
