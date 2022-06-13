import { Component, OnInit } from '@angular/core';
import { TasksService } from '../tasks.service';

@Component({
  selector: 'app-delete-page',
  templateUrl: './delete-page.page.html',
  styleUrls: ['./delete-page.page.scss'],
})
export class DeletePagePage implements OnInit {

  listProducts: any[] = [];
  listValue:any;
  listProducts1:any;

  constructor(  private tasksService: TasksService) { }

  ngOnInit( ) {

    this.tasksService.testTask1$
    .subscribe(product => {
      this.listProducts1 = product;

    }),
    this.tasksService.testTask3$

        .subscribe(testTask3 => {
          this.listProducts = testTask3;
        }),
        this.tasksService.testTask4$
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
