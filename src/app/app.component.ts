import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import Swal from 'sweetalert2';
import { AppState } from './app.reducer';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private authService:AuthService, private store:Store<AppState>){
    this.authService.userStatus()
    this.store.select('ui').subscribe(({loading}) => {
      if(loading) Swal.showLoading()
      else Swal.close()
    })
  }
}
