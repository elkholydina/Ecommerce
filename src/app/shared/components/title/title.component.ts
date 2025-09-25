import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-title',
  imports: [RouterLink],
  templateUrl: './title.component.html',
  styleUrl: './title.component.css'
})
export class TitleComponent
{
  @Input({required:true})
  title:string = ""
  @Input({required:true})
  color:string = ""
  @Input({required:true})
  background:string = ""
}
