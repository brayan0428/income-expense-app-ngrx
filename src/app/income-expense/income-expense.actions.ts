import { createAction, props } from '@ngrx/store';
import { IncomeExpense } from '../models/income-expense.model';

export const setItems = createAction(
  '[IncomeExpense] Set Items',
  props<{ items: IncomeExpense[] }>()
);
export const removeItems = createAction('[Income Expense] Remove Items');
