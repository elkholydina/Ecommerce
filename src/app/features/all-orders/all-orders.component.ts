import { Component, inject } from '@angular/core';
import { jwtDecode } from "jwt-decode";
import { AllordersService } from './services/allorders.service';
import { Orders } from './interfaces/orders.interface';
import { ButtonComponent } from "../../shared/components/button/button.component";


@Component({
  selector: 'app-all-orders',
  imports: [ButtonComponent],
  templateUrl: './all-orders.component.html',
  styleUrl: './all-orders.component.css'
})
export class AllOrdersComponent
{

  private readonly allOrders = inject(AllordersService)
  orders :Orders[] =[]

  decoded: any
  id !: string

  ngOnInit(): void {
    this.decodeToken()
    this.getOrders()
  }

  decodeToken (): void
  {
    this.decoded = jwtDecode( localStorage.getItem( 'token' ) as string )
    this.id = this.decoded.id
    console.log(this.decoded)
    console.log(this.id)
  }

  getOrders ():void
  {
    this.allOrders.getAllUserOrders( this.id ).subscribe( {
      next: (res) =>
      {
        this.orders = res
        console.log(this.orders)
       },
      error: (err) =>
      {

      }
     })
  }
}

