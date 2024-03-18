import {Component, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {selectTaskState} from "../../../store/task/task.selector";
import {TaskItemComponent} from "./task-item/task-item.component";
import {CreateTaskFormComponent} from "./create-task-form/create-task-form.component";
import {AsyncPipe} from "@angular/common";
import {Task} from "../../../models/task.model"
import {Status} from "../../../models/status.model";
import {async, BehaviorSubject} from "rxjs";
import {TaskFilterOptions} from "../../../models/taskFilterOptions.model";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    TaskItemComponent,
    AsyncPipe,
    CreateTaskFormComponent

  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {

  tasks$ = this.store.select(selectTaskState);
  tasks: BehaviorSubject<Task[]> = new BehaviorSubject<Task[]>([]);
  filteredAndSortedTasks: Task[] = [];
  sortOption: BehaviorSubject<"status" | "executors" | "deadline" | ""> = new BehaviorSubject<"status" | "executors" | "deadline" | "">("");
  filterOptions: BehaviorSubject<TaskFilterOptions> = new BehaviorSubject<TaskFilterOptions>({});
  newfilt: TaskFilterOptions = {taskStatus: "Not started"};

  sortTasks(tasks: Task[], sortOption: "status" | "executors" | "deadline" | ""): Task[] {
    switch (sortOption) {
      case "status": {
        const statusOrder: { [key in Status]: number } = {
          'Not started': 2,
          'In progress': 1,
          'Done': 0
        };
        return [...tasks].sort((a, b) => statusOrder[a.status] - statusOrder[b.status]);
      }
      case "executors": {
        return [...tasks].sort((a,b) => Math.min(...a.executorsId) - Math.min(...b.executorsId));
      }
      case "deadline": {
        return [...tasks].sort((a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime())
      }
      default: return tasks;

    }
  };

  filterTasks(tasks: Task[], filterOptions:TaskFilterOptions) {
    if (filterOptions.taskStatus) {
      tasks = tasks.filter((item) => item.status === filterOptions.taskStatus)
    }
    if (filterOptions.deadline) {
      tasks = tasks.filter((item) => ((item.deadline <= filterOptions.deadline!.deadlineEnd) && item.deadline >= filterOptions.deadline!.deadlineStart ));
    }
    if (filterOptions.executors) {
      tasks = tasks.filter((item) => item.executorsId.filter((newItem) => filterOptions.executors!.includes(newItem)).length > 0)
    }
    return tasks;
  };


  filterAndSort() {
    this.filteredAndSortedTasks = this.filterTasks(this.sortTasks(this.tasks.value, this.sortOption.value), this.filterOptions.value)
  }




  constructor(
    private store: Store
  ) {
  }

  ngOnInit() {
    this.tasks$.subscribe((value) => this.tasks.next(value));
    this.tasks.subscribe(() => this.filterAndSort());
    this.sortOption.subscribe(() => this.filterAndSort());
    this.filterOptions.subscribe(() => this.filterAndSort());
  }



}
