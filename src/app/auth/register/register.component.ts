import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { AuthService } from 'src/app/services/auth.service';
import { setLoading } from 'src/app/shared/ui.actions';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  form:FormGroup;

  constructor(
    private formBuild:FormBuilder, 
    private authService:AuthService,
    private router:Router,
    private store:Store<AppState>
  ) { 
    this.buildForm()
  }

  ngOnInit(): void {
  }

  buildForm(){
    this.form = this.formBuild.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    })
  }

  validField(field:string){
    return this.form.get(field)?.valid
  }

  onSubmit(){
    this.store.dispatch(setLoading({isLoading: true}))
    const {name, email, password} = this.form.value
    this.authService.createUser(name, email, password)
      .then(data => {
        this.store.dispatch(setLoading({isLoading: false}))
        this.router.navigate(['/'])
      })
      .catch(error => {
        this.store.dispatch(setLoading({isLoading: false}))
        Swal.fire('Error', error.message, 'error')
      })
  }
}
