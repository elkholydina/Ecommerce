import { Component, inject } from '@angular/core';
import { BrandsService } from './servives/brands.service';
import { Data } from '../categories/interfaces/categories.interface';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-brands',
  imports: [RouterLink],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.css'
})
export class BrandsComponent {

   private readonly brands = inject( BrandsService )
   AllBrands : Data[] = []

  ngOnInit(): void {
    this.getAllCategories()
  }

  getAllCategories (): void
  {
    this.brands.GetAllBrands().subscribe( {
      next: (res) =>
      {
        this.AllBrands = res.data
         console.log(this.AllBrands)
      }
    })
  }
}
