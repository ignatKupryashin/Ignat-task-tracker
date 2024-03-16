import {Component, Input} from '@angular/core';
import {Task} from "../../../../models/task.model";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-task-item',
  standalone: true,
  imports: [
    DatePipe
  ],
  templateUrl: './task-item.component.html',
  styleUrl: './task-item.component.scss'
})
export class TaskItemComponent {

  @Input({required: true}) task!: Task;

}
