import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { IncomeExpense } from '../models/income-expense.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class IncomeExpenseService {
  constructor(
    private firestore: AngularFirestore,
    private authService: AuthService
  ) {}

  createIncomeExpense(item: IncomeExpense) {
    const { uid } = this.authService.user;
    const { description, type, amount } = item;
    return this.firestore
      .doc(`${uid}/incomes-expenses`)
      .collection('items')
      .add({ description, type, amount });
  }
}
