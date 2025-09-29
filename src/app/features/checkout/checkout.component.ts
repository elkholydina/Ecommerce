import { Component, inject, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { CartService } from '../cart/services/cart.service';

@Component({
  selector: 'app-checkout',
  imports: [ ReactiveFormsModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent implements OnInit{
    private readonly route = inject( Router )
  private readonly tostr = inject( ToastrService )
  private readonly activatedRoute = inject( ActivatedRoute )
  private readonly checkOut = inject(CartService)


    isValid: boolean = false
  isLoading1: boolean = false
  isLoading2: boolean = false
  cartId:string = ''

    subscription : Subscription = new Subscription()

    checkoutForm !: FormGroup

    ngOnInit (): void
    {
      this.createFormGroup()
           this.getCartId ()
    }

    createFormGroup (): void
    {
      this.checkoutForm = new FormGroup( {
        'shippingAddress': new FormGroup( {
            "details": new FormControl( null, [ Validators.required ] ),
      "phone": new FormControl( null,[Validators.required,Validators.pattern(/^01[0125][0-9]{8}$/)] ),
      "city": new FormControl( null,[Validators.required] ),
        })
    }  )

  }

  getCartId ():void {
    this.activatedRoute.paramMap.subscribe( {
      next: (urlParams)=>{
        this.cartId = urlParams.get('id') as string
         }
       })
  }

  submitForm1 (): void
  {
    if ( this.checkoutForm.valid )
    {
      console.log(this.cartId)
      console.log(this.checkoutForm.value)
              this.isLoading1 = true
      this.subscription.unsubscribe()

      this.subscription = this.checkOut.checkOutPayment( this.cartId ,  this.checkoutForm.value ).subscribe( {

        next: (res) =>
        {
          console.log(res)
          if ( res.status == "success" )
          {
            console.log('success')
                        this.isLoading1 = false
                    setTimeout(() => {
                           window.open(res.session.url , '_self')
                    }, 500 );

            }
        },error: (err) =>
        {
         console.log(err.error.message)
        }
      })

} else
  {
    this.isValid = true
  }
}

submitForm2 (): void
{
     if ( this.checkoutForm.valid )
    {
      console.log(this.cartId)
      console.log(this.checkoutForm.value)
              this.isLoading2 = true
      this.subscription.unsubscribe()

      this.subscription = this.checkOut.cashPayment( this.cartId ,  this.checkoutForm.value ).subscribe( {

        next: (res) =>
        {
          console.log( res )
          this.isLoading2 = false
          if ( res.status == "success" )
          {
            console.log('success')
                    setTimeout(() => {
                           this.route.navigate(["/cash-order"])
                    }, 500 );

            }
        },error: (err) =>
        {
         console.log(err.error.message)
        }
      })

} else
  {
    this.isValid = true
  }
}
}

