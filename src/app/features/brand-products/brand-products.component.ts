import { Component, inject } from '@angular/core';
import { Metadata, Product, Products } from '../../core/models/products.interface';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../core/services/products.service';
import { CardComponent } from "../../shared/components/card/card.component";
import {NgxPaginationModule} from 'ngx-pagination';
import { SearchPipe } from '../../shared/pipes/search-pipe';
import { FormsModule } from '@angular/forms';
import { BrandPipe } from '../../shared/pipes/brand-pipe';

@Component({
  selector: 'app-brand-products',
  imports: [CardComponent,NgxPaginationModule , SearchPipe , BrandPipe , FormsModule],
  templateUrl: './brand-products.component.html',
  styleUrl: './brand-products.component.css'
})
export class BrandProductsComponent {

  private readonly router = inject(ActivatedRoute)
  private readonly Allproducts = inject( ProductsService )
  AllData : Products [ ] = [ ]
   products: Product[] = [];
  metaData: Metadata = {} as Metadata

  title: string = ''
  id:string = ''

  pageSize!: number
  p!: number
  total!:number

   ngOnInit (): void
   {
     this.router.paramMap.subscribe( (params) =>
     {
       this.id = params.get( 'id' ) as string
       console.log(this.id)
     }
     )
    this.getAllProducts()
  }

   getAllProducts (pageNumber:number = 1): void
  {
    this.Allproducts.getAllProducts(pageNumber).subscribe( {
      next: (res) =>
      {
        this.metaData = res.metadata
        this.products = res.data
        console.log( this.products )
        this.pageSize = this.metaData.limit
        this.p = this.metaData.currentPage
        this.total = res.results

      },
      error: () => { console.log("error on fetching products data") },
      complete:()=>{}
    })
  }

}
