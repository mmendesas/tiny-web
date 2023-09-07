import { CollectionView } from '../lib/views/CollectionView';

import { Todo } from '../models/Todo';
import { TodoProps } from '../models/Todo.old';
import { TodoItem } from './TodoItem';

export class TodoList extends CollectionView<Todo, TodoProps> {
  renderItem(model: Todo, itemParent: Element): void {
    new TodoItem(itemParent, model).render();

    model.on('delete', () => {
      this.collection.trigger('delete', { id: model.get('id') });
    });
  }
}
