import axios, { AxiosResponse } from 'axios';

import { Events } from './Events';

export class Collection<T, K> {
  models: T[] = [];
  events: Events = new Events();

  constructor(
    public baseURL: string, //
    public deserialize: (json: K) => T
  ) {}

  get on() {
    return this.events.on;
  }

  get trigger() {
    return this.events.trigger;
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
