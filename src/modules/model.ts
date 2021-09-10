import { BASE_HOST } from '../index';
import {
  ICar, ICreate, IWinn, IWinner,
} from './interfaces';

export class ModelApp {
  constructor() {}

  async getData(request: string, amount?: boolean) {
    const query = (await fetch(`${BASE_HOST}/${request}`));
    return (amount) ? query.headers.get('X-Total-Count') : query.json();
  }

  async getEngine(id: number, stat: string) {
    return this.getData(`engine?id=${id}&status=${stat}`);
  }

  async race(id: number) {
    const res = await fetch(`${BASE_HOST}/engine?id=${id}&status=drive`).catch();
    return res.status !== 200 ? { success: false } : { ...(await res.json()) };
  }

  async createCar(body: ICreate | IWinner, location: string) {
    return (
      await fetch(`${BASE_HOST}/${location}`, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
          'Content-Type': 'application/json',
        },
      })
    ).json();
  }

  async deleteCar(id: number, location: string) {
    return (
      await fetch(`${BASE_HOST}/${location}/${id}`, { method: 'DELETE' })
    ).json();
  }

  async updateCar(id: number, body: ICar | IWinn, location: string) {
    return (
      await fetch(`${BASE_HOST}/${location}/${id}`, {
        method: 'PUT',
        body: JSON.stringify(body),
        headers: {
          'Content-Type': 'application/json',
        },
      })
    ).json();
  }
}
