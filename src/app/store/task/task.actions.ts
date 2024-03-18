import {createAction, createActionGroup, props} from "@ngrx/store";
import {Task} from "../../models/task.model";
import {Status} from "../../models/status.model";


export const TaskActions = createActionGroup({
  source: 'TaskAPI',
  events: {
    'Load Tasks': props< {taskArray: Task[]}>(),
    'Add Task': props<{ task: Task }>(),
    'Remove Task': props<{ taskId: number }>(),
    'Set Status': props<{ taskId: number, status: Status }>(),
    'Add Executor': props<{ taskId: number, executorId: number }>(),
    'Remove Executor': props<{ taskId: number, executorId: number }>(),
    'Set Executors': props<{ taskId: number, executorsId: number[] }>()
  },
});


