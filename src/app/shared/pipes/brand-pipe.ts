import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'brand'
})
export class BrandPipe implements PipeTransform {

  transform(arr: any, id:string): any[] {
    return arr.filter( (item:any) =>
    {
      return item.brand._id == id
    })
  }

}
