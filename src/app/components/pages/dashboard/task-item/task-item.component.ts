import {Component, Input, OnInit} from '@angular/core';
import {Task} from "../../../../models/task.model";
import {AsyncPipe, DatePipe, NgClass} from "@angular/common";
import {Store} from "@ngrx/store";
import {selectUser, selectUserState} from "../../../../store/user/user.selector";
import {PriorityPipe} from "../../../../pipes/priority.pipe";
import {TaskActions} from "../../../../store/task/task.actions";
import {MatButton} from "@angular/material/button";
import {MatFormField} from "@angular/material/form-field";
import {MatOption} from "@angular/material/autocomplete";
import {MatSelect} from "@angular/material/select";
import {FormControl, FormGroup, FormsModule} from "@angular/forms";
import {Status} from "../../../../models/status.model";


@Component({
  selector: 'app-task-item',
  standalone: true,
  imports: [
    DatePipe,
    AsyncPipe,
    PriorityPipe,
    MatButton,
    MatFormField,
    MatOption,
    MatSelect,
    FormsModule,
    NgClass
  ],
  templateUrl: './task-item.component.html',
  styleUrl: './task-item.component.scss'
})
export class TaskItemComponent implements OnInit {

  @Input({required: true}) task!: Task;
  protected users = this.store.select(selectUserState);
  taskExecutors: number[] = [];
  taskStatus: Status = "Not started";
  statusList: Status[] = ["Not started", "In progress", "Done"];


  constructor(
    public store: Store,

  ) {}

  ngOnInit() {
    this.taskExecutors = [...this.task.executorsId]
    this.taskStatus = this.task.status;
  }

  deleteTask() {
    this.store.dispatch(TaskActions.removeTask({taskId: this.task.taskId}));
  }

  changeExecutors() {
    this.store.dispatch(TaskActions.setExecutors({taskId: this.task.taskId, executorsId: this.taskExecutors}))
  }

  changeStatus() {
    this.store.dispatch(TaskActions.setStatus({taskId: this.task.taskId, status: this.taskStatus}));
  }

}
