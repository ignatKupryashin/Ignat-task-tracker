import {Status} from "./status.model";

export interface TaskFilterOptions {
  taskStatus?: Status,
  deadline?: {
    deadlineStart?: Date,
    deadlineEnd?: Date
  },
  executors?: number[];
}
