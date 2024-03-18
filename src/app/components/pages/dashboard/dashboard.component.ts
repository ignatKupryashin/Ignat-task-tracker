import {Component} from '@angular/core';
import {Store} from "@ngrx/store";
import {selectTaskState} from "../../../store/task/task.selector";
import {AsyncPipe, DatePipe} from "@angular/common";
import {TaskActions} from "../../../store/task/task.actions";
import {Priority} from "../../../models/priority.model";
import {TaskItemComponent} from "./task-item/task-item.component";
import {MatButton, MatButtonModule} from '@angular/material/button';
import {MatTooltip} from "@angular/material/tooltip";
import {FormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatIconModule} from "@angular/material/icon";
import {MatOption, MatSelect} from "@angular/material/select";
import {MatDatepicker, MatDatepickerInput, MatDatepickerToggle} from "@angular/material/datepicker";
import {MAT_DATE_FORMATS, provideNativeDateAdapter} from "@angular/material/core";
import {MY_DATE_FORMATS} from "../../../helpers/date-format";
import {selectUserState} from "../../../store/user/user.selector";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    AsyncPipe,
    DatePipe,
    TaskItemComponent,
    MatButton,
    MatTooltip,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSelect,
    MatOption,
    MatDatepickerToggle,
    MatDatepicker,
    MatDatepickerInput
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  providers: [provideNativeDateAdapter(),
    {provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS}
   ],
})
export class DashboardComponent {
  taskHeading: string = "";
  taskPriority: Priority = Priority.MEDIUM;
  taskBody: string = "";
  taskDeadline: Date = new Date(Date.now());
  taskExecutors: number[] = [];

  tasks = this.store.select(selectTaskState);
  users = this.store.select(selectUserState);

  constructor(
    private store: Store
  ){
  }

  addTask() {
    this.store.dispatch(TaskActions.addTask({
      task: {
        taskId: Date.now(),
        heading: this.taskHeading,
        priority: this.taskPriority,
        body: this.taskBody,
        created: new Date(Date.now()),
        deadline: new Date(this.taskDeadline),
        status: "Not started",
        executorsId: this.taskExecutors
      }
    }))
  }

  submitButton() {
    this.addTask();
  }

  protected readonly Priority = Priority;
}
