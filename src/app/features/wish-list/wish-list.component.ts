import { Product } from './../../core/models/products.interface';
import { Component, inject } from '@angular/core';
import { WishListService } from '../../core/services/wish-list.service';
import { CardComponent } from "../../shared/components/card/card.component";
import { ButtonComponent } from "../../shared/components/button/button.component";
import { LinkComponent } from "../../shared/components/link/link.component";
import { ToastrService } from 'ngx-toastr';
import { TitleComponent } from "../../shared/components/title/title.component";

@Component({
  selector: 'app-wish-list',
  imports: [ButtonComponent, LinkComponent, TitleComponent],
  templateUrl: './wish-list.component.html',
  styleUrl: './wish-list.component.css'
})
export class WishListComponent {

  private readonly wishList = inject( WishListService )
     private readonly tostr = inject(ToastrService)


  products: Product[] = []
  wishlistProducts:string[] = JSON.parse( localStorage.getItem( 'wishlist' ) as string )

  ngOnInit(): void {
    this.wishlist()

  }

 wishlist (): void
  {
    this.wishList.wishList().subscribe( {
      next: (res) =>
      {
        console.log( res.data )
        this.products = res.data

        for ( let product of this.products )
        {
           this.wishlistProducts.push(product._id)
        }
        localStorage.setItem('wishlist' , JSON.stringify(this.wishlistProducts))
        console.log(JSON.parse(localStorage.getItem('wishlist') as string))
      }
    })
  }

   removeFromWishList (id:string): void
   {
    console.log(id)
    this.wishList.removeFromWishList( id ).subscribe( {
      next: (res) =>
      {
        this.wishlistProducts = this.wishlistProducts.filter( ( item ) => { item != id } )
        localStorage.setItem('wishlist' , JSON.stringify(this.wishlistProducts))
         this.wishlist()
        console.log( res )
        setTimeout(() => {

          if ( res.status == "success" )
          this.tostr.success(
    'Item removed from your wish list.',
    '',
    {
      timeOut: 1000,
      extendedTimeOut: 500,
      progressBar: true
            }
  );
        }, 500);
        }
    } )
  }

}
