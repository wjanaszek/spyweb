import { Model } from './model';

export class Admin extends Model {
  id: number;
  login: string;
  password: string;
  loggedIn = false;

  constructor() {
    super();
  }
}
