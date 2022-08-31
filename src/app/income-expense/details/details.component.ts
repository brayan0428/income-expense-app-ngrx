import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/app.reducer';
import { IncomeExpense } from 'src/app/models/income-expense.model';
import { IncomeExpenseService } from 'src/app/services/income-expense.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
})
export class DetailsComponent implements OnInit, OnDestroy {
  items: IncomeExpense[] = [];
  itemsSub: Subscription;

  constructor(
    private store: Store<AppState>,
    private incomeExpenseService: IncomeExpenseService
  ) {}

  ngOnInit(): void {
    this.itemsSub = this.store
      .select('incomeExpense')
      .subscribe(({ items }) => {
        this.items = items;
      });
  }

  deleteItem(uid: string) {
    this.incomeExpenseService
      .deleteItem(uid)
      .then(() =>
        Swal.fire('Confirmación', 'Item eliminado correctamente', 'success')
      )
      .catch((error) => Swal.fire('Error', error.message, 'error'));
  }

  ngOnDestroy(): void {
    this.itemsSub.unsubscribe();
  }
}
