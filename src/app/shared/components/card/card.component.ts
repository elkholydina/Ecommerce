import { Component, Input, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LinkComponent } from "../link/link.component";
import { ButtonComponent } from "../button/button.component";
import { WishListService } from '../../../core/services/wish-list.service';
import { ToastrService } from 'ngx-toastr';
import { Product } from '../../../core/models/products.interface';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule, LinkComponent, ButtonComponent],
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  private readonly wishList = inject(WishListService);
  private readonly tostr = inject(ToastrService);

  @Input() product: Product = {} as Product;
  @Input() status: string = '';
  @Input() isWishlist: boolean = false;

  wishlistProducts: string[] = [];

  ngOnInit(): void {
    try {
      const raw = localStorage.getItem('wishlist') || '[]';
      this.wishlistProducts = JSON.parse(raw);
      if (!Array.isArray(this.wishlistProducts)) this.wishlistProducts = [];
    } catch {
      this.wishlistProducts = [];
    }
  }

  toggleWish(id?: string, event?: Event): void {
    if (!id) return;
    if (event) event.stopPropagation();

    if (this.wishlistProducts.includes(id)) {
      // remove
      this.wishList.removeFromWishList(id).subscribe({
        next: (res: any) => {
          if (res?.status === 'success') {
            this.wishlistProducts = this.wishlistProducts.filter(item => item !== id);
            localStorage.setItem('wishlist', JSON.stringify(this.wishlistProducts));
            this.tostr.success('Item removed from your wish list.', '', { timeOut: 1000, progressBar: true });
          }
        },
        error: () => this.tostr.error('Failed to remove item from wishlist.')
      });
    } else {
      // add
      this.wishList.addToWishList({ productId: id }).subscribe({
        next: (res: any) => {
          if (res?.status === 'success') {
            if (!this.wishlistProducts.includes(id)) this.wishlistProducts.push(id);
            localStorage.setItem('wishlist', JSON.stringify(this.wishlistProducts));
            this.tostr.success('Item added to your wish list.', '', { timeOut: 1000, progressBar: true });
          }
        },
        error: () => this.tostr.error('Failed to add item to wishlist.')
      });
    }
  }
}
