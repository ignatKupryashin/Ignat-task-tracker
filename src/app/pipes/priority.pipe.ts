import { Pipe, PipeTransform } from '@angular/core';
import {Priority} from "../models/priority.model";

@Pipe({
  name: 'priority',
  standalone: true
})
export class PriorityPipe implements PipeTransform {
  transform(priority: Priority): string {
    switch (priority) {
      case (0): {return "Высокий";}
      case (1): {return "Средний";}
      case (2): {return "Низкий";}
    }
    return "";
  }

}
