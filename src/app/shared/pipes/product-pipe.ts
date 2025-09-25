import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'product'
})
export class ProductPipe implements PipeTransform {

  transform(arr: any, id:string): any[] {
    return arr.filter( (item:any) =>
    {
      return item.category._id == id
    })
  }

}
