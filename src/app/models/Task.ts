import { Priority } from "./Priority";

export interface Task {
  title: string;
  heading: string;
  created: Date;
  deadline: Date;
  priority: Priority;
  status: string;
  executors: number[];
}
