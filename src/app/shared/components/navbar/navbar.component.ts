import { Component, HostListener, inject, Input } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Component( {
  selector: 'app-navbar',
  imports: [ RouterLink, RouterLinkActive ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
} )
export class NavbarComponent
{

  private readonly router = inject( Router )
  private readonly tostr = inject( ToastrService )
  onScroll: boolean = false

  isMenuOpen: boolean = false;

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }


  @Input( { required: true } )
  isLogin: boolean = false

  isLogged = localStorage.getItem( 'token' ) ? true : false


  signOut (): void
  {
    setTimeout( () =>
    {
      localStorage.removeItem( 'token' )
      this.isLogged = false
      this.router.navigate( [ '/home' ] )
    }, 300 );
    this.tostr.success(
      'sign out successfully.',
      '',
      {
        timeOut: 3000,
        extendedTimeOut: 500,
        progressBar: true
      }
    );
  }

}
