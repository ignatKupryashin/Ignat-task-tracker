import {Component, Input, OnInit} from '@angular/core';
import {MatButtonToggle, MatButtonToggleGroup} from "@angular/material/button-toggle";
import {FormsModule} from "@angular/forms";
import {
  MAT_FORM_FIELD_DEFAULT_OPTIONS,
  MatFormField,
  MatFormFieldModule,
} from "@angular/material/form-field";
import {MatOption} from "@angular/material/autocomplete";
import {
  MatDatepickerToggle,
  MatDateRangeInput,
  MatDateRangePicker,
  MatEndDate,
  MatStartDate
} from "@angular/material/datepicker";
import {MatSelect} from "@angular/material/select";
import {BehaviorSubject} from "rxjs";
import {Task} from "../../../../models/task.model";
import {TaskFilterOptions} from "../../../../models/taskFilterOptions.model";
import {TaskSortOption} from "../../../../models/taskSortOption.model";
import {Status} from "../../../../models/status.model";
import {selectUserState} from "../../../../store/user/user.selector";
import {Store} from "@ngrx/store";
import {AsyncPipe} from "@angular/common";
import {MAT_DATE_FORMATS, provideNativeDateAdapter} from "@angular/material/core";
import {MY_DATE_FORMATS} from "../../../../helpers/date-format";
import {MatInputModule} from "@angular/material/input";
import {MatButton} from "@angular/material/button";

@Component({
  selector: 'app-filter-and-sorting',
  standalone: true,
  imports: [
    MatButtonToggleGroup,
    MatButtonToggle,
    FormsModule,
    MatFormField,
    MatOption,
    MatDateRangeInput,
    MatEndDate,
    MatDatepickerToggle,
    MatDateRangePicker,
    MatSelect,
    MatStartDate,
    AsyncPipe,
    MatFormFieldModule,
    MatInputModule,
    MatButton,
  ],
  templateUrl: './filter-and-sorting.component.html',
  styleUrl: './filter-and-sorting.component.scss',
  providers: [provideNativeDateAdapter(),
    {provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS},
    {provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { subscriptSizing: 'dynamic'}}
  ],
})


export class FilterAndSortingComponent implements OnInit{

  @Input({required: true}) tasks!: BehaviorSubject<Task[]>
  @Input({required: true}) filteredAndSortedTasks!: BehaviorSubject<Task[]>;
  sortOption: BehaviorSubject<"status" | "executors" | "deadline" | ""> = new BehaviorSubject<"status" | "executors" | "deadline" | "">("");
  filterOptions: BehaviorSubject<TaskFilterOptions> = new BehaviorSubject<TaskFilterOptions>({});
  currentSortOption: TaskSortOption = "";
  currentFilterDeadlineStart: Date | undefined = undefined;
  currentFilterDeadlineEnd: Date | undefined = undefined;
  currentStatusFilter: Status | undefined = undefined;
  currentExecutorsFilter: number[] = [];

  users$ = this.store.select(selectUserState);

  constructor(private store: Store) {
  }

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
    this.filteredAndSortedTasks.next(this.filterTasks(this.sortTasks(this.tasks.value, this.sortOption.value), this.filterOptions.value));
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
      },
      executors: this.currentExecutorsFilter.length > 0 ? [...this.currentExecutorsFilter] : undefined
    })
  }

  clearFilter() {
    this.currentFilterDeadlineStart = undefined;
    this.currentFilterDeadlineEnd = undefined;
    this.currentStatusFilter = undefined;
    this.currentExecutorsFilter = [];
    this.changeFilter();
  }



  ngOnInit() {
    this.tasks.subscribe(() => this.filterAndSort());
    this.sortOption.subscribe(() => this.filterAndSort());
    this.filterOptions.subscribe(() => this.filterAndSort());
  }

}
