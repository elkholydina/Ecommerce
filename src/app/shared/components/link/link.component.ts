import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-link',
  imports: [RouterLink],
  templateUrl: './link.component.html',
  styleUrl: './link.component.css'
})
export class LinkComponent {

  @Input( { required: true } )
  content: string = "";
  @Input()
  slug: string = "";
  @Input()
  id: string = ""
}
