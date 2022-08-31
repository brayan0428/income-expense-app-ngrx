import { state } from '@angular/animations';
import { createReducer, on } from '@ngrx/store';
import { IncomeExpense } from '../models/income-expense.model';
import { removeItems, setItems } from './income-expense.actions';

export interface IncomeExpenseState {
  items: IncomeExpense[];
}

const initialState: IncomeExpenseState = {
  items: [],
};

export function incomeExpenseReducer(state, reducer) {
  return _incomeExpenseReducer(state, reducer);
}

const _incomeExpenseReducer = createReducer(
  initialState,
  on(setItems, (state, { items }) => ({ ...state, items })),
  on(removeItems, (state) => ({ ...state, items: [] }))
);
