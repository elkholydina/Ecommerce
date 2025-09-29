import { Component, inject } from '@angular/core';
import { ProductsService } from '../../core/services/products.service';
import {  Metadata, Product, Products } from './../../core/models/products.interface';
import { CardComponent } from "../../shared/components/card/card.component";
import {NgxPaginationModule} from 'ngx-pagination';
import { SearchPipe } from '../../shared/pipes/search-pipe';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-shop',
  imports: [CardComponent,NgxPaginationModule , SearchPipe , FormsModule],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.css'
})
export class ShopComponent
{
  private readonly Allproducts = inject( ProductsService )
  AllData : Products [ ] = [ ]
   products: Product[] = [];
  metaData: Metadata = {} as Metadata

  title : string = ''

  pageSize!: number
  p!: number
  total!:number

   ngOnInit (): void
  {
    this.getAllProducts()
  }

   getAllProducts (pageNumber:number = 1): void
  {
    this.Allproducts.getAllProducts(pageNumber).subscribe( {
      next: (res) =>
      {
        console.log( res )
        this.metaData = res.metadata
        this.products = res.data
        this.pageSize = this.metaData.limit
        this.p = this.metaData.currentPage
        this.total = res.results

      },
      error: () => { console.log("error on fetching products data") },
      complete:()=>{}
    })
  }
}
