import {Task} from "../../models/task.model";
import {createFeatureSelector, createSelector} from "@ngrx/store";

export interface TaskState {
  tasks: Task[];
}

export const selectTaskState = createFeatureSelector<Task[]>('tasks');

export const selectTask = (taskId: number) => createSelector(
  selectTaskState,
  (tasks: Task[]) => tasks.find(item => item.taskId === taskId)
);
