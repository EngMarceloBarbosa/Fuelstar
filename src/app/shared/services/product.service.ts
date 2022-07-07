import { Injectable } from '@angular/core';
import { TasksService } from './tasks.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  productList:any[]=[];
  totalValueRequest: number;
  Total:number;
  // quantity:any;

  // quantity1: any = 0;
  constructor(private tasksService: TasksService) { }



  addValueProduct(newElement,ammount){
    console.log(newElement, "NOVO ELEEMNTO")

    console.log(ammount, "QUANTIDADE")
  const index= this.productList.findIndex(ele => ele.id === newElement.id);
  if(index >= 0){
    // this.quantity1 = this.quantity1 + this.quantity;
    this.productList[index].quantity = ammount;
    this.productList[index].totalValueItem = newElement.price * this.productList[index].quantity;
  }else {
    this.productList = [
      ...this.productList,
      {
        ...newElement,ammount,
        quantity:ammount,
        totalValueItem: newElement.price * ammount
      }
    ];
  }
  this.tasksService.listProductsNew$.next(this.productList);
  console.log(this.productList, "1")
  }


  totalValueOrder(){
    console.log("Boas")
    this.totalValueRequest = 0;
    this.productList.map(elem => {
      this.totalValueRequest += elem.totalValueItem;
      console.log( this.totalValueRequest.toFixed(2));
    })
    this.tasksService.valueTotal$.next(this.totalValueRequest.toFixed(2));
  }


}
