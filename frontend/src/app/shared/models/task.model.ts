import { Model } from './model';

export class Task extends Model {
  id: number;
  name: string;
  status: string;
  creationTimestamp: string;
  lastUpdateTimestamp: string;
  fileUrl: string;

  constructor() {
    super();
  }
}
