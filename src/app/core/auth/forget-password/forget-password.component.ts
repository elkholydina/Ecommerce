import { Component, inject, OnInit } from '@angular/core';
import {  FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { ForgetPasswordService } from './services/forget-password.service';

@Component({
  selector: 'app-forget-password',
  imports: [RouterLink , ReactiveFormsModule],
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.css'
})
export class ForgetPasswordComponent
{

  private readonly forgetPassword = inject( ForgetPasswordService )
  private readonly route = inject(Router)

  isValid: boolean = false
  isLoading: boolean = false
  flag1: boolean = false
  state : number = 1

  verifyEmail !: FormGroup
  code !: FormGroup
  resetPassword !: FormGroup

  subscription: Subscription = new Subscription()
  private readonly tostr = inject(ToastrService)


  ngOnInit (): void
  {
    this.createFormGroup ()
  }

  createFormGroup (): void
  {
     this.verifyEmail = new FormGroup( {
        "email": new FormControl( null, [ Validators.required, Validators.email] ),
     } )

    this.code = new FormGroup( {
        "resetCode": new FormControl( null, [ Validators.required] ),
    } )

    this.resetPassword = new FormGroup( {
        "email": new FormControl( null, [ Validators.required, Validators.email] ),
    "newPassword": new FormControl( null,[Validators.required, Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/)] ),
  } )

  }

  submitForm (): void
  {
    if ( this.verifyEmail.valid )
    {
      this.isLoading = true
      this.subscription.unsubscribe()
      console.log( this.verifyEmail )
      this.subscription=this.forgetPassword.verifyMail( this.verifyEmail.value ).subscribe( {
        next: ()=>{
          this.isLoading = false
           this.tostr.success(
  'Email verified.',
  '',
  {
    timeOut: 1000,
    extendedTimeOut: 500,
    progressBar: true
  }
);
                  setTimeout(() => {
                         this.state = 2
                  }, 500);

        }, error: () =>
        {
          this.isLoading = false
        }
      })

    } else
    {
      this.isValid = true
    }

    if ( this.code.valid )
    {
            this.isValid = false

      this.isLoading = true
      this.subscription.unsubscribe()
      console.log( this.code )
      this.subscription=this.forgetPassword.verifyCode( this.code.value ).subscribe( {
        next: ()=>{
          this.isLoading = false
           this.tostr.success(
  'code verified.',
  '',
  {
    timeOut: 1000,
    extendedTimeOut: 500,
    progressBar: true
  }
);
                  setTimeout(() => {
                         this.state = 3
                  }, 500);

        }, error: () =>
        {
          this.isLoading = false
        }
      })

    } else
    {
      this.isValid = true
    }

    if ( this.resetPassword.valid )
    {
            this.isValid = false

      this.isLoading = true
      this.subscription.unsubscribe()
      console.log( this.resetPassword )
      this.subscription=this.forgetPassword.resetPassword( this.resetPassword.value ).subscribe( {
        next: ( res )=>{
          this.isLoading = false
          localStorage.setItem('token' , res.token)
           this.tostr.success(
  'Password has been reset successfully.',
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

        }, error: () =>
        {
          this.isLoading = false
        }
      })

    } else
    {
      this.isValid = true
    }
  }



}
