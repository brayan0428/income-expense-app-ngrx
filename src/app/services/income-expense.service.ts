import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map } from 'rxjs';
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

  suscribeItems(uidUser: string) {
    return this.firestore
      .collection(`${uidUser}/incomes-expenses/items`)
      .snapshotChanges()
      .pipe(
        map((items) =>
          items.map((item) => ({
            uid: item.payload.doc.id,
            ...(item.payload.doc.data() as any),
          }))
        )
      );
  }

  deleteItem(uidItem: string) {
    return this.firestore
      .doc(`${this.authService.user.uid}/incomes-expenses/items/${uidItem}`)
      .delete();
  }
}
