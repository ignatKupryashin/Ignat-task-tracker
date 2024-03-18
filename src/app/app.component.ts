import {Component, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {Observable} from "rxjs";
import {TasksService} from "./services/tasks.service";
import {UserService} from "./services/user.service";
import {UserActions} from "./store/user/user.actions";
import {TaskActions} from "./store/task/task.actions";
import {selectUserState} from "./store/user/user.selector";
import {selectTaskState} from "./store/task/task.selector";
import {User} from "./models/user.model";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'effective-mobile-test';



  constructor(
    private taskService: TasksService,
    private userService: UserService,
    private store: Store
  ) {}

  ngOnInit() {
    this.store.dispatch(UserActions.loadData({data: this.userService.getUsers()}));
    this.store.dispatch(TaskActions.loadTasks({taskArray: this.taskService.getTasks()}));
    this.saveUsers();
    this.saveTasks();
  }


  loadUsers() {

  }

  saveUsers() {
    this.store.select(selectUserState).subscribe((data) => {
      localStorage.setItem("users", JSON.stringify(data));
    });
  }

  saveTasks() {
    this.store.select(selectTaskState).subscribe((data) => {
      localStorage.setItem("tasks", JSON.stringify(data));
    });
  }

}
