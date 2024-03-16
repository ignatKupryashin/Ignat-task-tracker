import {Injectable} from '@angular/core';
import {Task} from "../models/task.model";
import {TASK_MOCKS} from "../mocks/tasksMocks";

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  constructor() {  }

  getTasks(): Task[] {
    return TASK_MOCKS;
  }

}
