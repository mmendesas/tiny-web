import axios, { AxiosPromise } from 'axios';

interface HasId {
  id?: number;
}

// fetching system
export class Sync<T extends HasId> {
  constructor(public baseURL: string) {}

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
