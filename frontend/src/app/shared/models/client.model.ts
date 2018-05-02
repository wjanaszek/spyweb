import { Model } from "./model";

export class Client extends Model {
  id: number;
  ip: string;
  status: string;

  constructor() {
    super();
  }
}
