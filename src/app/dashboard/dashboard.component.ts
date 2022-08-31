import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { filter, Subscription } from 'rxjs';
import { AppState } from '../app.reducer';
import { AuthState } from '../auth/auth.reducer';
import { setItems } from '../income-expense/income-expense.actions';
import { IncomeExpense } from '../models/income-expense.model';
import { IncomeExpenseService } from '../services/income-expense.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit, OnDestroy {
  userSub: Subscription;
  itemsSub: Subscription;

  constructor(
    private incomeExpense: IncomeExpenseService,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.userSub = this.store
      .select('auth')
      .pipe(filter((auth: AuthState) => auth.user !== null))
      .subscribe(({ user }) => {
        this.itemsSub = this.incomeExpense
          .suscribeItems(user.uid)
          .subscribe((items: IncomeExpense[]) => {
            this.store.dispatch(setItems({ items }));
          });
      });
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
    this.itemsSub.unsubscribe();
  }
}
