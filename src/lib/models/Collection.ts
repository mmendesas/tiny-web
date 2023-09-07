import axios, { AxiosResponse } from 'axios';

import { Events } from './Events';

export class Collection<T, K> {
  models: T[] = [];
  events: Events = new Events();

  constructor(
    public baseURL: string, //
    public deserialize: (json: K) => T
  ) {
    this.on('delete', ({ id }) => this.deleteItem(id));
    this.on('add', (payload: K) => this.addItem(payload));
  }

  get on() {
    return this.events.on;
  }

  get trigger() {
    return this.events.trigger;
  }

  deleteItem(id: string): void {
    console.log('item to delete', id, this.models);

    this.models = this.models.filter((model: T) => {
      return model.get('id') !== id;
    });
    this.trigger('change');
  }

  addItem(payload: K) {
    console.log('collection add item', payload);
    this.models.push(this.deserialize(payload));
  }

  fetch(): void {
    axios.get(this.baseURL).then((response: AxiosResponse): void => {
      response.data.forEach((element: K) => {
        this.models.push(this.deserialize(element));
      });

      this.trigger('change');
    });
  }
}
