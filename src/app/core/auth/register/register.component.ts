import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthserviceService } from '../services/authservice.service';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';




@Component({
  selector: 'app-register',
  imports: [ RouterLink, ReactiveFormsModule

  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit
{

  private readonly signUp = inject( AuthserviceService )
  private readonly route = inject( Router )
    private readonly tostr = inject(ToastrService)


  isValid: boolean = false
  isLoading: boolean = false
  flag1 : boolean = false
  flag2: boolean = false

  subscription : Subscription = new Subscription()

  registerForm !: FormGroup

  ngOnInit (): void
  {
    this.createFormGroup ()
  }

  createFormGroup (): void
  {
    this.registerForm= new FormGroup( {
    "name": new FormControl( null, [ Validators.required, Validators.minLength( 6 ), Validators.maxLength( 20 ) ] ),
    "email": new FormControl( null, [ Validators.required, Validators.email] ),
    "password": new FormControl( null,[Validators.required, Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/)] ),
    "rePassword": new FormControl( null,[Validators.required, Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/)] ),
    "phone": new FormControl( null,[Validators.required,Validators.pattern(/^01[0125][0-9]{8}$/)] ),
  } , {validators : this.confirmPassword} )

  }

  confirmPassword ( group: AbstractControl )
  {
    return group.get( "password" )?.value === group.get( "rePassword" )?.value ? null : {mismatch : true}
  }
  submitForm (): void
  {
    if ( this.registerForm.valid )
    {
      this.isLoading = true
      this.subscription.unsubscribe()
      console.log( this.registerForm )
      this.subscription = this.signUp.signupData( this.registerForm.value ).subscribe( {
        next: ( res )=>{
          this.isLoading = false
           this.tostr.success(
  'you register Successfully.',
  '',
  {
    timeOut: 1000,
    extendedTimeOut: 500,
    progressBar: true
  }
);
                  setTimeout(() => {
                         this.route.navigate(['/login'])
                  }, 500 );


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
