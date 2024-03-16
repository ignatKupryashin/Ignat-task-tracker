import {User} from "../../models/user.model";
import {createFeatureSelector, createSelector} from "@ngrx/store";

export interface UserState {
  users: User[];
}

export const selectUserState = createFeatureSelector<User[]>('users')

export const selectUser = (userId: number) => createSelector(
  selectUserState,
  (users: User[]) => users.find(item => item.userId === userId)
);
