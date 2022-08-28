import { state } from "@angular/animations";
import { Action, createReducer, on } from "@ngrx/store";
import { setLoading } from "./ui.actions";

export interface UiState {
    loading:boolean
}

const initialState:UiState = {
    loading: false
}

export function uiReducer(state, action){
    return _uiReducer(state, action)
}

const _uiReducer = createReducer(initialState, 
    on(setLoading, (state, {isLoading}) => ({...state, loading: isLoading}))
)