import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {User} from "../models/user.model";
import {USER_MOCKS} from "../mocks/userMocks";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  getUsers(): User[] {
    const data = localStorage.getItem("users");
    if (data !== null) {
      return JSON.parse(data) as User[];
    } else {
      return USER_MOCKS;
    }
  }

}
