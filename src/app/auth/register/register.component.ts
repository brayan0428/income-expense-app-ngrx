import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
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
    private router:Router
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
    Swal.showLoading()
    const {name, email, password} = this.form.value
    this.authService.createUser(name, email, password)
      .then(data => {
        Swal.close()
        this.router.navigate(['/'])
      })
      .catch(error => Swal.fire('Error', error.message, 'error'))
  }
}
