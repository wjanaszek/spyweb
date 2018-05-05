import { Model } from './model';
import { Task } from './task.model';

export class User extends Model {
  id: number;
  name: string;
  status: string;
  taskList: Task[] = [];

  constructor() {
    super();
  }
}
