import {createAction, createActionGroup, props} from "@ngrx/store";
import {User} from "../../models/user.model";

export const UserActions = createActionGroup({
  source: 'UsersApi',
  events: {
    'Add User': props<{ name: string }>(),
    'Remove User': props<{ userId: number }>(),
    'Load Data': props<{data: User[]}>()
  },
});
