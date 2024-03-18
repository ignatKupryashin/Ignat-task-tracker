import {ActionCreatorProps, createReducer, on} from "@ngrx/store";
import {Task} from "../../models/task.model";
import {TaskActions} from "./task.actions";
import {state} from "@angular/animations";
import {Status} from "../../models/status.model";

export const initialState: Task[] = [];

export const taskReducer = createReducer(
  initialState,
  on(TaskActions.removeTask, (state, {taskId}) =>
    state.filter((item) => item.taskId !== taskId)
  ),

  on(TaskActions.loadTasks, (state, {taskArray}) => [...taskArray]),

  on(TaskActions.addTask, (state, {task}) => [...state, task]),

  on(TaskActions.setStatus, (state,  {taskId, status} ) => {
    return state.map((task) =>
      task.taskId === taskId ? { ...task, status: status } : task
    );
  }),

  on(TaskActions.setExecutors, (state, {taskId, executorsId}) =>
    state.map((task) => task.taskId === taskId ? { ...task, executorsId: [...executorsId]} : task)
  ),


);
