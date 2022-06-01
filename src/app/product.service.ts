import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  productList:any[]=[];
  totalValueRequest: number;

  constructor() { }



  addValueProduct(newElement){
  const index= this.productList.findIndex(ele => ele.id === newElement.id);
  if(index >= 0){
    this.productList[index].quantity++;
    this.productList[index].totalValueItem = newElement.price * this.productList[index].quantity;
  }else {
    this.productList = [
      ...this.productList,
      {
        ...newElement,
        quantity:1,
        totalValueItem: newElement.price
      }
    ];
  }
  }

  totalValueOrder(){
    this.totalValueRequest = 0;
    this.productList.map(elem => {
      this.totalValueRequest += elem.totalValueItem;
    })
  }
}
