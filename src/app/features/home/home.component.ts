import { Product } from './../../core/models/products.interface';
import { Component, inject, OnInit } from '@angular/core';
import { CardComponent } from "../../shared/components/card/card.component";
import { ProductsService } from '../../core/services/products.service';
import { TitleComponent } from "../../shared/components/title/title.component";
import { LinkComponent } from "../../shared/components/link/link.component";
import { CarouselModule } from 'ngx-owl-carousel-o';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { AllCategoriesService } from '../../core/services/all-categories.service';
import { Category } from '../../core/models/categories.interface';


@Component({
  selector: 'app-home',
  imports: [CardComponent, TitleComponent, LinkComponent , CarouselModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  private readonly Allproducts = inject( ProductsService )
  private readonly AllCategories = inject( AllCategoriesService )
  products: Product[] = []
  categories: Category[] = []

 sliders = [
  {
    src: "./imgs/hero_endframe__cvklg0xk3w6e_large 2.png",
    alt: "hero image",
    title: "SALE UP TO 35% OFF",
    desc: "UP TO 35% OFF VOUCHER"
  },
  {
    src: "./imgs/wormMan.png",
    alt: "man image",
    title: "Bring THE WARMTH",
    desc: "SHOP FOR 50% OFF DISCOUNT"
  },
  {
    src: "./imgs/attractive-woman-wearing-hat-posing-black-background 1.png",
    alt: "woman image",
    title: "SALE UP TO 50% OFF",
    desc: "WOMAN'S COLLECTIONs"
  },
  {
    src: "./imgs/img1.png",
    alt: "man image",
    title: "SALE UP TO 60% OFF",
    desc: "HUNDREDS OF NEW LOWER PRICES"
  }
];


  CategoriesOption: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    autoplay: true,
    autoplayHoverPause: true,
    autoplaySpeed: 400,
    autoplayTimeout:1500,
    navSpeed: 700,
    navText: ['<i class="fa-solid fa-backward  text-blue-500"></i>', '<i class="fa-solid fa-forward text-blue-500"></i>'],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 6
      }
    },
    nav: false
  }
  mainSliderOption: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: true,
    autoplay: true,
    autoplayHoverPause: true,
    autoplaySpeed: 500,
    autoplayTimeout:4000,
    navSpeed: 700,
    navText: [  ],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 1
      },
      740: {
        items: 1
      },
      940: {
        items: 1
    },
    },
    nav: false
  }

  ngOnInit (): void
  {
    this.getAllProducts()
    this.getAllCategories()
  }
  getAllProducts (): void
  {
    this.Allproducts.getAllProducts().subscribe( {
      next: (res) =>
      {
        console.log(res)
          this.products = res.data
      },
      error: () => { console.log("error on fetching products data") },
      complete:()=>{}
    })
  }
  getAllCategories (): void
  {
    this.AllCategories.getAllCategories().subscribe( {
      next: (res) =>
      {
        console.log(res)
          this.categories = res.data
      },
      error: () => { console.log("error on fetching categories data") },
      complete:()=>{}
    })
  }


}
