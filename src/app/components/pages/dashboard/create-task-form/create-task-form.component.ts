import {Component, OnInit} from '@angular/core';
import {Priority} from "../../../../models/priority.model";
import {AsyncPipe} from "@angular/common";
import {MatButton} from "@angular/material/button";
import {MatDatepicker, MatDatepickerInput, MatDatepickerToggle} from "@angular/material/datepicker";
import {MatFormField, MatHint, MatLabel, MatSuffix} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatOption} from "@angular/material/autocomplete";
import {MatSelect} from "@angular/material/select";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {TaskActions} from "../../../../store/task/task.actions";
import {Store} from "@ngrx/store";
import {selectUserState} from "../../../../store/user/user.selector";
import {MAT_DATE_FORMATS, provideNativeDateAdapter} from "@angular/material/core";
import {MY_DATE_FORMATS} from "../../../../helpers/date-format";
import {PriorityPipe} from "../../../../pipes/priority.pipe";
import {Status} from "../../../../models/status.model";

@Component({
  selector: 'app-create-task-form',
  standalone: true,
  imports: [
    AsyncPipe,
    MatButton,
    MatDatepicker,
    MatDatepickerInput,
    MatDatepickerToggle,
    MatFormField,
    MatHint,
    MatInput,
    MatLabel,
    MatOption,
    MatSelect,
    MatSuffix,
    ReactiveFormsModule,
    FormsModule,
    PriorityPipe
  ],
  templateUrl: './create-task-form.component.html',
  styleUrl: './create-task-form.component.scss',
  providers: [provideNativeDateAdapter(),
    {provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS}
  ],
})
export class CreateTaskFormComponent implements OnInit{

  protected readonly Priority = Priority;
  taskCreateForm!: FormGroup;

  users = this.store.select(selectUserState);

  constructor(
    private store: Store,
    // public taskCreateForm: FormGroup = new FormGroup({})
  ) {
  }

  ngOnInit() {
    this.taskCreateForm = new FormGroup({
      heading: new FormControl<string>("", [
        Validators.required,
        Validators.minLength(1)
      ]),
      priority: new FormControl<Priority>(Priority.MEDIUM),
      body: new FormControl<string>(""),
      deadline: new FormControl<Date>(new Date(Date.now())),
      executorsId: new FormControl<number[]>([])
    });
  }


  addTask() {
    this.store.dispatch(TaskActions.addTask({
      task: {
        taskId: Date.now(),
        heading: this.taskCreateForm.value["heading"],
        priority: this.taskCreateForm.value["priority"],
        body: this.taskCreateForm.value["body"],
        created: new Date(Date.now()),
        deadline: this.taskCreateForm.value["deadline"],
        status: "Not started",
        executorsId: this.taskCreateForm.value["executorsId"]
      }
    }))
  }

  submitButton() {
    this.addTask();
  }
}
