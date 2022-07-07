import { Component, OnInit } from '@angular/core';
import { TasksService } from '../shared/services/tasks.service';

@Component({
  selector: 'app-finish-order',
  templateUrl: './finish-order.page.html',
  styleUrls: ['./finish-order.page.scss'],
})
export class FinishOrderPage implements OnInit {

  listProducts: any[] = [];
  listValue1:any;
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
        .subscribe(valueTotal => {
          this.listValue1 = valueTotal;
          console.log(this.listValue1, "ENTROU NO FINISH")
        }),
        console.log(this.listProducts)
  }

  finish(){

  }

  clear(){

  }

  close(){

  }
}
