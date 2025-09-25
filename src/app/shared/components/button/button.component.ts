import { Component, inject, Input, input } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router, RouterLink } from '@angular/router';
import { CartService } from '../../../features/cart/services/cart.service';


@Component({
  selector: 'app-button',
  imports: [RouterLink],
  templateUrl: './button.component.html',
  styleUrl: './button.component.css'
})
export class ButtonComponent
{

    private readonly cart = inject( CartService )
   private readonly router = inject(Router)
  private readonly tostr = inject(ToastrService)

  @Input( { required: true } )
  title: string = 'Add to Cart'
  @Input( )
  product_id: any = ''
  @Input( )
  cart_id: string = ''

  addToCart (id:string): void
  {
    if ( localStorage.getItem( 'token' ) )
    {
      this.cart.addToCart( id ).subscribe( {
        next: ( res ) =>
        {
          console.log(res)
       this.tostr.success(
  'Item added to Cart Successfully.',
  '',
  {
    timeOut: 1000,
    extendedTimeOut: 500,
    progressBar: true
  }
);
        }, error: (err) =>
        {
          console.log("error to adding item ")
        }
      })

    } else
    {
        this.router.navigate(['/login'])
    }

  }
}

