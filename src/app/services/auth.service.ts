import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Store } from '@ngrx/store';
import { map, Subscription } from 'rxjs';
import { AppState } from '../app.reducer';
import { removeUser, setUser } from '../auth/auth.actions';
import { removeItems } from '../income-expense/income-expense.actions';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userDataSubscription: Subscription;
  private _user: User;

  constructor(
    private auth: AngularFireAuth,
    private firestore: AngularFirestore,
    private store: Store<AppState>
  ) {}

  get user() {
    return this._user;
  }

  userStatus() {
    this.auth.authState.subscribe((user) => {
      this.userDataSubscription = this.firestore
        .doc(`${user?.uid}/user`)
        .valueChanges()
        .subscribe((userData: any) => {
          if (userData) {
            const newUser = new User(
              userData.uid,
              userData.name,
              userData.email
            );
            this._user = newUser;
            this.store.dispatch(setUser({ user: newUser }));
          } else {
            this._user = null;
            this.userDataSubscription.unsubscribe();
            this.store.dispatch(removeUser());
            this.store.dispatch(removeItems());
          }
        });
    });
  }

  createUser(name: string, email: string, password: string) {
    return this.auth
      .createUserWithEmailAndPassword(email, password)
      .then(({ user }) => {
        const newUser = new User(user.uid, name, user.email);
        return this.firestore.doc(`${user?.uid}/user`).set({ ...newUser });
      });
  }

  loginUser(email: string, password: string) {
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  logout() {
    return this.auth.signOut();
  }

  isAuth() {
    return this.auth.authState.pipe(map((user) => user != null));
  }
}
