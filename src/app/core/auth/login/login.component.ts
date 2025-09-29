import { Component, inject, OnInit } from '@angular/core';
import {  FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthserviceService } from '../services/authservice.service';
import { Router, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-login',
  imports: [RouterLink , ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit
{
  private readonly login = inject( AuthserviceService )
  private readonly route = inject(Router)

  isValid: boolean = false
  isLoading: boolean = false
  flag1:boolean = false

  loginForm !: FormGroup

  subscription: Subscription = new Subscription()
    private readonly tostr = inject(ToastrService)


  ngOnInit (): void
  {
    this.createFormGroup ()
  }

  createFormGroup (): void
  {
     this.loginForm = new FormGroup( {
        "email": new FormControl( null, [ Validators.required, Validators.email] ),
    "password": new FormControl( null,[Validators.required, Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/)] ),
  } )

  }

  submitForm (): void
  {
    if ( this.loginForm.valid )
    {
      this.isLoading = true
      this.subscription.unsubscribe()
      console.log( this.loginForm )
      this.subscription=this.login.loginData( this.loginForm.value ).subscribe( {
        next: ( res )=>{
          this.isLoading = false
          localStorage.setItem('token' , res.token)
           this.tostr.success(
  'log in successfully.',
  '',
  {
    timeOut: 1000,
    extendedTimeOut: 500,
    progressBar: true
  }
);
                  setTimeout(() => {
                         this.route.navigate(['/home'])
                  }, 500);

        },
        error :( error )=>
        {
         this.isLoading = false
          console.log( error )
        }
      })

    } else
    {
      this.isValid = true
    }
  }

}
