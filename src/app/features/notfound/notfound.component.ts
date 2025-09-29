import { Component } from '@angular/core';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { RouterLink } from '@angular/router';
import { ButtonComponent } from "../../shared/components/button/button.component";


@Component({
  selector: 'app-notfound',
  imports: [NavbarComponent, FooterComponent, ButtonComponent],
  templateUrl: './notfound.component.html',
  styleUrl: './notfound.component.css'
})
export class NotfoundComponent {

}
