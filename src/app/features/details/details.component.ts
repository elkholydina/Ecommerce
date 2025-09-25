import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../details/interfaces/product.interface';
import { ProductService } from './services/product.service';
import { ButtonComponent } from "../../shared/components/button/button.component";
import { TitleComponent } from "../../shared/components/title/title.component";

@Component({
  selector: 'app-details',
  imports: [ButtonComponent, TitleComponent],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class DetailsComponent implements OnInit
{
  private readonly productUrl = inject( ActivatedRoute )
  private readonly product = inject( ProductService )
  item: Product = {
    data: {
     sold: 0,
      images: [],
      ratingsQuantity: 0,
      _id: "",
      title: '',
      slug: '',
      description: '',
      quantity: 0,
      price: 0,
      imageCover: '',
      category: { _id: '',
        name: '',
  slug: '',
  image: ''},
      brand: { _id: '',
  name: '',
  slug: '',
  image: ''},
      ratingsAverage: 0,
      createdAt: '',
      updatedAt: '',
      __v: 0,
      reviews: [],
      id: ''
  }}
  productId: string | null = null
  imgIndex: number = 0


ngOnInit (): void
{
  this.getProductId()
  this.getProduct()
}

  getProductId (): void
  {
    this.productUrl.paramMap.subscribe( {
      next: ( res ) =>
      {
        this.productId = res.get( 'id' )
        console.log(this.productId)
      }
    })
  }
  getProduct (): void
  {
    this.product.getProduct( this.productId as string ).subscribe( {
      next: (res) =>
      {
        this.item = res
        console.log(res)
         }
     })
  }

  getImage (index:number): void
  {
    this.imgIndex = index
  }
}
