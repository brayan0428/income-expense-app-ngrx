import { createAction, props } from "@ngrx/store";
import { User } from "../models/user.model";

export const setUser = createAction('[Auth] Set User', props<{user:User}>())
export const removeUser = createAction('[Auth] Remove User')