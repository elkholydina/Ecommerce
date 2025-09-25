import { Component, inject } from '@angular/core';
import { CategoriesService } from './services/categories.service';
import { Categories, Data} from './interfaces/categories.interface';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-categories',
  imports: [RouterLink],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css'
})
export class CategoriesComponent {

  private readonly categories = inject( CategoriesService )
   AllCategories : Data[] = []

  ngOnInit(): void {
    this.getAllCategories()
  }

  getAllCategories (): void
  {
    this.categories.GetAllCategories().subscribe( {
      next: (res) =>
      {
        this.AllCategories = res.data
         console.log(this.AllCategories)
      }
    })
  }
}
