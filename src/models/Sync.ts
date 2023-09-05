import axios, { AxiosPromise, AxiosResponse } from 'axios';

interface HasId {
  id?: number;
}

export class Sync<T extends HasId> {
  constructor(public baseURL: string) {}

  // fetching system
  fetch(id: number): AxiosPromise {
    return axios.get(`${this.baseURL}/${id}`);
  }

  save(data: T): AxiosPromise {
    const { id } = data;
    if (id) {
      // update
      return axios.put(`${this.baseURL}/${id}`, data);
    } else {
      // create new one
      return axios.post(`${this.baseURL}`, data);
    }
  }
}
