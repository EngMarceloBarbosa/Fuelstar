import { Injectable } from '@angular/core';
import { element } from 'protractor';
import { TasksService } from './tasks.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  // productList:any[]=[];


  Total:number;
  // quantity:any;

  // quantity1: any = 0;
  constructor(private tasksService: TasksService) { }



  addValueProduct(newElement,ammount){
    console.log(newElement, "NOVO ELEEMNTO")

    console.log(ammount, "QUANTIDADE")
  const index= this.tasksService.productList.findIndex(ele => ele.id === newElement.id);
  if(index >= 0){
    // this.quantity1 = this.quantity1 + this.quantity;
    this.tasksService.productList[index].quantity = ammount;
    this.tasksService.productList[index].totalValueItem = newElement.price * this.tasksService.productList[index].quantity;

  }else {
    this.tasksService.productList = [
      ...this.tasksService.productList,
      {
        ...newElement,ammount,
        quantity:ammount,
        totalValueItem: newElement.price * ammount

      }

    ];



  }

  // this.tasksService.listProductsNew$.next(this.tasksService.productList);
  console.log(this.tasksService.productList, "1")

  }


  totalValueOrder(){
    console.log("Boas")
    this.tasksService.totalValueRequest = 0;
    console.log(this.tasksService.productList);
this.tasksService.quantity1 = this.tasksService.quantity2

    this.tasksService.quantity1 = 0

    // this.tasksService.quantityTotal = 0;
    this.tasksService.productList.map(elem => {
      console.log(elem)
      this.tasksService.totalValueRequest += elem.totalValueItem;

      this.tasksService.quantity1 += elem.quantity;
      console.log(this.tasksService.quantity1)
      // this.tasksService.quantityTotal += elem.quantity;


    })
    // this.tasksService.valueTotal$.next(this.tasksService.totalValueRequest.toFixed(2));
  }



}
