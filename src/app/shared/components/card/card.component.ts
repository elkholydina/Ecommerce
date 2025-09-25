import { CartService } from './../../../features/cart/services/cart.service';
import { Component, inject, input, Input, OnInit } from '@angular/core';
import { ButtonComponent } from "../button/button.component";
import { Product, Products } from '../../../core/models/products.interface';
import { LinkComponent } from "../link/link.component";
import { RouterLink } from '@angular/router';
import { WishListService } from '../../../core/services/wish-list.service';
import { ToastrService } from 'ngx-toastr';




@Component( {
  selector: 'app-card',
  imports: [LinkComponent, ButtonComponent],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
} )
export class CardComponent
{

  private readonly wishList = inject( WishListService )
    private readonly tostr = inject(ToastrService)

  @Input( { "required": true } )
  product: Product = {} as Product
  @Input()
  status: string = ""
  @Input()
  isWishlist : boolean = false

  wishlistProducts: string[] = JSON.parse( localStorage.getItem( 'wishlist' ) as string )

  addToWishList (id:string): void
  {

    this.wishList.addToWishList( {"productId" : id} ).subscribe( {
      next: (res) =>
      {
        console.log( res )
        if ( res.status == 'success' )
        {
           this.addWishListToLocalStorage (id)
                 this.tostr.success(
  'Item added to your wish list.',
  '',
  {
    timeOut: 1000,
    extendedTimeOut: 500,
    progressBar: true
  }
);
        }

        }
      })
  }

  addWishListToLocalStorage (id:string): void
  {
        this.wishlistProducts = JSON.parse( localStorage.getItem( 'wishlist' ) as string )
    this.wishlistProducts.push( id )
    localStorage.setItem( 'wishlist', JSON.stringify( this.wishlistProducts ) )
     console.log(this.wishlistProducts)
  }

}
