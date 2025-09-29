import { Component, inject, OnInit } from '@angular/core';
import { CartService } from './services/cart.service';
import { ButtonComponent } from "../../shared/components/button/button.component";
import { Data } from './interfaces/cart.interface';

import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cart',
  imports: [ButtonComponent],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit
{
  private readonly userCart = inject( CartService )
  private readonly toastr = inject( ToastrService )
  cartData: Data = {} as Data



  ngOnInit (): void
  {
    this.getUserCart ()

  }

  getUserCart (): void
  {
    this.userCart.getCart().subscribe( {
      next: ( res ) =>
      {
        this.cartData = res.data

      },
      error: ( err )=>{
          console.log(err)
      }
    })
  }

  deleteSpecificProduct ( id: string ): void
  {
    this.userCart.removeSpecificProduct( id ).subscribe( {
      next: (res) =>
      {
        this.getUserCart()
        console.log( res )
         this.toastr.success(
   "Item removed form cart Successfully.",
  '',
  {
    timeOut: 1000,
    extendedTimeOut: 500,
    progressBar: true
  }
);

      }
    })
  }
  updateProduct ( id: string , count:number ): void
  {
    this.userCart.updateProduct(count , id).subscribe( {
      next: (res) =>
        {
        this.getUserCart()
        console.log( res )
         this.toastr.success(
   "Item updated successfully.",
  '',
  {
    timeOut: 1000,
    extendedTimeOut: 500,
    progressBar: true
  }
);

      }
    })
  }

}
