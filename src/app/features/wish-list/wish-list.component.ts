// src/app/features/wish-list/wish-list.component.ts
import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WishListService } from '../../core/services/wish-list.service';
import { CardComponent } from '../../shared/components/card/card.component';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { LinkComponent } from '../../shared/components/link/link.component';
import { TitleComponent } from '../../shared/components/title/title.component';
import { ToastrService } from 'ngx-toastr';
import { Product } from './../../core/models/products.interface';

@Component({
  selector: 'app-wish-list',
  standalone: true,
  imports: [CommonModule, CardComponent, ButtonComponent, LinkComponent, TitleComponent],
  templateUrl: './wish-list.component.html',
  styleUrls: ['./wish-list.component.css']
})
export class WishListComponent implements OnInit {
  private readonly wishList = inject(WishListService);
  private readonly tostr = inject(ToastrService);

  products: Product[] = [];
  wishlistProducts: string[] = [];

  ngOnInit(): void {
    try {
      this.wishlistProducts = JSON.parse(localStorage.getItem('wishlist') || '[]');
      if (!Array.isArray(this.wishlistProducts)) this.wishlistProducts = [];
    } catch {
      this.wishlistProducts = [];
    }
    this.loadWishlist();
  }

  loadWishlist(): void {
    this.wishList.wishList().subscribe({
      next: (res: any) => {
        this.products = res?.data || [];
        this.wishlistProducts = this.products.map(p => p._id);
        localStorage.setItem('wishlist', JSON.stringify(this.wishlistProducts));
      },
      error: (err) => console.error(err)
    });
  }

  removeFromWishList(id: string): void {
    this.wishList.removeFromWishList(id).subscribe({
      next: (res: any) => {
        if ( res?.status === 'success' )
        {
          this.loadWishlist();
          this.wishlistProducts = this.wishlistProducts.filter(item => item !== id);
          localStorage.setItem('wishlist', JSON.stringify(this.wishlistProducts));
          this.tostr.success('Item removed from your wish list.', '', { timeOut: 1000, progressBar: true });
        }
      },
      error: () => this.tostr.error('Failed to remove item.')
    });
  }

}
