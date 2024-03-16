import {User} from "../../models/user.model";
import {createReducer, on} from "@ngrx/store";
import {UserActions} from "./user.actions";
import {state} from "@angular/animations";

export const initialState: User[] = [];

export const userReducer = createReducer(
  initialState,
  on(UserActions.removeUser, (state, {userId}) =>
    state.filter((item) => item.userId !== userId)
  ),

  on(UserActions.addUser, (state, {name}) => {
    return [...state, {
      name: name,
      userId: Date.now()
    }];
  }),

  on(UserActions.loadData, (state, {data }) => [...data])

);
