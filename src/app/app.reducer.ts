import { ActionReducerMap } from '@ngrx/store';
import { authReducer, AuthState } from './auth/auth.reducer';
import {
  incomeExpenseReducer,
  IncomeExpenseState,
} from './income-expense/income-expense.reducer';
import { uiReducer, UiState } from './shared/ui.reducer';

export interface AppState {
  ui: UiState;
  auth: AuthState;
  incomeExpense: IncomeExpenseState;
}

export const appReducers: ActionReducerMap<AppState> = {
  ui: uiReducer,
  auth: authReducer,
  incomeExpense: incomeExpenseReducer,
};
