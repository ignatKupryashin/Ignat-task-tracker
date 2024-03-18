import {Injectable} from '@angular/core';
import {Task} from "../models/task.model";
import {TASK_MOCKS} from "../mocks/tasksMocks";
import {User} from "../models/user.model";
import {USER_MOCKS} from "../mocks/userMocks";

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  constructor() {  }

  getTasks(): Task[] {
    const data = localStorage.getItem("tasks");
    if (data !== null) {
      return JSON.parse(data) as Task[];
    } else {
      return TASK_MOCKS;
    }
  }
}
