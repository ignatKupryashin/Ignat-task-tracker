import {Priority} from "../models/priority.model";
import {Task} from "../models/task.model";

export const TASK_MOCKS: Task[] = [
  {
  taskId: 1,
  status: "Not started",
  executorsId: [],
  created: new Date(Date.now()),
  deadline: new Date(Date.now() + 10000000),
  heading: "First Task",
  body: "Hello World",
  priority: Priority.LOW
},
  {
    taskId: 2,
    status: "In progress",
    executorsId: [],
    created: new Date(Date.now()),
    deadline: new Date(Date.now() + 100000),
    heading: "Second Task",
    body: "Angular is the best",
    priority: Priority.HIGH
  }


]
