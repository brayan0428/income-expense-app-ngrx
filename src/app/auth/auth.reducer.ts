import { createReducer, on } from "@ngrx/store";
import { User } from "../models/user.model";
import { removeUser, setUser } from "./auth.actions";

export interface AuthState{
    user:User
}

const initialState:AuthState = {
    user: null
}

export function authReducer(state, action){
    return _authReducer(state, action)
}

const _authReducer = createReducer(initialState, 
    on(setUser, (state, {user}) => ({...state, user})),
    on(removeUser, state => ({...state, user: null}))
)