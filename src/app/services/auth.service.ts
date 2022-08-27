import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth:AngularFireAuth) {}

  userStatus(){
    this.auth.authState.subscribe(user => console.log(user))
  }

  createUser(email:string, password:string){
    return this.auth.createUserWithEmailAndPassword(email, password)
  }

  loginUser(email:string, password:string){
    return this.auth.signInWithEmailAndPassword(email, password)
  }

  logout(){
    return this.auth.signOut()
  }

  isAuth(){
    return this.auth.authState.pipe(map(user => user != null))
  }
}
