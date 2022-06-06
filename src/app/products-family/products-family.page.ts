import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { product } from '../shared/models/product-list';


import { TasksService } from '../tasks.service';

@Component({
  selector: 'app-products-family',
  templateUrl: './products-family.page.html',
  styleUrls: ['./products-family.page.scss'],
})
export class ProductsFamilyPage implements OnInit {

  options: any;
  listProducts : any;
  // newProducts: {name: string; price:number}[]=[];
  newProducts:any[]=[];



  products2 = product ;

  constructor( private router: Router, private tasksService: TasksService) { }

  ngOnInit() {


  }

  close(){

  }

  back(){
    this.router.navigate(['products']);
  }

  cardsClick(test){
  this.router.navigate(['products-details']);
  this.tasksService.testTask1$.next(test);









}
}
