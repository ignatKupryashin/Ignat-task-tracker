import {Component, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {selectTaskState} from "../../../store/task/task.selector";
import {TaskItemComponent} from "./task-item/task-item.component";
import {CreateTaskFormComponent} from "./create-task-form/create-task-form.component";
import {AsyncPipe} from "@angular/common";
import {Task} from "../../../models/task.model"
import {BehaviorSubject} from "rxjs";
import {MatButton} from "@angular/material/button";
import {MatButtonToggle, MatButtonToggleGroup} from "@angular/material/button-toggle";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormField, MatLabel, MatSuffix} from "@angular/material/form-field";
import {MatOption, MatSelect} from "@angular/material/select";
import {
  MatDatepicker,
  MatDatepickerInput,
  MatDatepickerToggle,
  MatDateRangeInput,
  MatDateRangePicker,
  MatEndDate,
  MatStartDate
} from "@angular/material/datepicker";
import {MatInput} from "@angular/material/input";
import {provideNativeDateAdapter} from "@angular/material/core";
import {FilterAndSortingComponent} from "./filter-and-sorting/filter-and-sorting.component";

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
    MatEndDate,
    FilterAndSortingComponent

  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  providers: [provideNativeDateAdapter(),
    {provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { subscriptSizing: 'dynamic'}}
  ],
})
export class DashboardComponent implements OnInit {

  tasks: BehaviorSubject<Task[]> = new BehaviorSubject<Task[]>([]);
  tasks$ = this.store.select(selectTaskState);
  filteredAndSortedTasks: BehaviorSubject<Task[]> = new BehaviorSubject<Task[]>([]);

  constructor(
    private store: Store
  ) {
  }

  ngOnInit() {
    this.tasks$.subscribe((value) => this.tasks.next(value));
  }


}
