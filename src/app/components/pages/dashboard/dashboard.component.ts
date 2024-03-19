import {Component, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {selectTaskState} from "../../../store/task/task.selector";
import {TaskItemComponent} from "./task-item/task-item.component";
import {CreateTaskFormComponent} from "./create-task-form/create-task-form.component";
import {AsyncPipe} from "@angular/common";
import {Task} from "../../../models/task.model"
import {Status} from "../../../models/status.model";
import {BehaviorSubject} from "rxjs";
import {TaskFilterOptions} from "../../../models/taskFilterOptions.model";
import {MatButton} from "@angular/material/button";
import {MatButtonToggle, MatButtonToggleGroup} from "@angular/material/button-toggle";
import {TaskSortOption} from "../../../models/taskSortOption.model";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormField, MatLabel, MatSuffix} from "@angular/material/form-field";
import {MatOption, MatSelect} from "@angular/material/select";
import {
  MatDatepicker,
  MatDatepickerInput,
  MatDatepickerToggle,
  MatDateRangeInput,
  MatDateRangePicker, MatEndDate, MatStartDate
} from "@angular/material/datepicker";
import {MatInput} from "@angular/material/input";
import {MAT_DATE_FORMATS, provideNativeDateAdapter} from "@angular/material/core";
import {MY_DATE_FORMATS} from "../../../helpers/date-format";
import {log} from "@angular-devkit/build-angular/src/builders/ssr-dev-server";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    TaskItemComponent,
    AsyncPipe,
    CreateTaskFormComponent,
    MatButton,
    MatButtonToggleGroup,
    MatButtonToggle,
    FormsModule,
    MatFormField,
    MatSelect,
    MatOption,
    MatLabel,
    MatDatepicker,
    MatDatepickerInput,
    MatDatepickerToggle,
    MatInput,
    MatSuffix,
    ReactiveFormsModule,
    MatDateRangePicker,
    MatDateRangeInput,
    MatStartDate,
    MatEndDate

  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  providers: [provideNativeDateAdapter(),
    {provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS},
    {provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: {appearance: 'outline'}}
  ],
})
export class DashboardComponent implements OnInit {

  tasks$ = this.store.select(selectTaskState);
  tasks: BehaviorSubject<Task[]> = new BehaviorSubject<Task[]>([]);
  filteredAndSortedTasks: Task[] = [];
  sortOption: BehaviorSubject<"status" | "executors" | "deadline" | ""> = new BehaviorSubject<"status" | "executors" | "deadline" | "">("");
  filterOptions: BehaviorSubject<TaskFilterOptions> = new BehaviorSubject<TaskFilterOptions>({});
  currentSortOption: TaskSortOption = "";
  currentFilterDeadlineStart: Date | undefined = undefined;
  currentFilterDeadlineEnd: Date | undefined = undefined;

  currentStatusFilter: Status | undefined = undefined;

  sortTasks(tasks: Task[], sortOption: TaskSortOption): Task[] {
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
        return [...tasks].sort((a, b) => Math.min(...a.executorsId) - Math.min(...b.executorsId));
      }
      case "deadline": {
        return [...tasks].sort((a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime())
      }
      default:
        return tasks;

    }
  };

  filterTasks(tasks: Task[], filterOptions: TaskFilterOptions) {
    if (filterOptions.taskStatus) {
      tasks = tasks.filter((item) => item.status === filterOptions.taskStatus)
    }
    if (filterOptions.deadline) {
      if (filterOptions.deadline!.deadlineStart) {
        tasks = tasks.filter((item) => new Date(item.deadline).getDate() >= new Date(filterOptions.deadline!.deadlineStart!).getDate());
      }
      if (filterOptions.deadline!.deadlineEnd) {
        tasks = tasks.filter((item) => new Date(item.deadline).getDate() <= new Date(filterOptions.deadline!.deadlineEnd!).getDate());
      }
    }
    if (filterOptions.executors) {
      tasks = tasks.filter((item) => item.executorsId.filter((newItem) => filterOptions.executors!.includes(newItem)).length > 0)
    }
    return tasks;
  };


  filterAndSort() {
    this.filteredAndSortedTasks = this.filterTasks(this.sortTasks(this.tasks.value, this.sortOption.value), this.filterOptions.value)
  }

  changeSort() {
    this.sortOption.next(this.currentSortOption)
  }

  changeFilter() {
    this.filterOptions.next({
      taskStatus: this.currentStatusFilter,
      deadline: {
        deadlineStart: this.currentFilterDeadlineStart,
        deadlineEnd: this.currentFilterDeadlineEnd
      }
    })
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
