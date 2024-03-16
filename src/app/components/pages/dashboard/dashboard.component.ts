import {Component} from '@angular/core';
import {Store} from "@ngrx/store";
import {selectTaskState} from "../../../store/task/task.selector";
import {AsyncPipe, DatePipe} from "@angular/common";
import {TaskActions} from "../../../store/task/task.actions";
import {Priority} from "../../../models/priority.model";
import {TaskItemComponent} from "./task-item/task-item.component";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    AsyncPipe,
    DatePipe,
    TaskItemComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

    tasks = this.store.select(selectTaskState);

    constructor(
      private store: Store
    ){
}

  addTask() {
    this.store.dispatch(TaskActions.addTask({
      task: {
        taskId: Date.now(),
        heading: "Добавленная задача",
        priority: Priority.MEDIUM,
        body: "Новый заголовок",
        created: new Date(Date.now()),
        deadline: new Date(Date.now() + 10000),
        status: "Not started",
        executorsId: []
      }
    }))
  }

}
