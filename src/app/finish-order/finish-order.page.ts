import { Component, OnInit } from '@angular/core';
import { TasksService } from '../tasks.service';

@Component({
  selector: 'app-finish-order',
  templateUrl: './finish-order.page.html',
  styleUrls: ['./finish-order.page.scss'],
})
export class FinishOrderPage implements OnInit {

  listProducts: any[] = [];
  listValue:any;
  listProducts1:any;

  constructor(  private tasksService: TasksService) { }

  ngOnInit( ) {

    this.tasksService.chooseProduct$
    .subscribe(product => {
      this.listProducts1 = product;

    }),
    this.tasksService.listProductsNew$

        .subscribe(testTask3 => {
          this.listProducts = testTask3;
        }),
        this.tasksService.valueTotal$
        .subscribe(testTask4 => {
          this.listValue = testTask4;
          console.log(this.listValue, "ENTROU")
        })
        console.log(this.listProducts)
  }


  clear(){

  }

  close(){

  }
}
