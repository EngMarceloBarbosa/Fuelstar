import { Component, Input, OnInit, Output } from '@angular/core';
import { TasksService } from '../tasks.service';

@Component({
  selector: 'app-orders-details',
  templateUrl: './orders-details.page.html',
  styleUrls: ['./orders-details.page.scss'],
})
export class OrdersDetailsPage implements OnInit {

  badges: any;



  constructor(private tasksService: TasksService, private loc: Location) { }

  ngOnInit() {
    this.tasksService.badge$
    .subscribe(res => {
      this.badges = res;
    })

  }





}
