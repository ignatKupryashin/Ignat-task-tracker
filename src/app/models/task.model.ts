import { Priority } from "./priority.model";
import { Status } from "./status.model";

export interface Task {
  taskId: number;
  heading: string;
  body: string;
  created: Date;
  deadline: Date;
  priority: Priority;
  status: Status;
  executorsId: number[];
}
