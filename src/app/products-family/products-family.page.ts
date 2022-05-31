import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TasksService } from '../tasks.service';

@Component({
  selector: 'app-products-family',
  templateUrl: './products-family.page.html',
  styleUrls: ['./products-family.page.scss'],
})
export class ProductsFamilyPage implements OnInit {

  options: any;
  listProducts : any;

 @Input() products2: any[] = [

    {
    tittle: 'vinhos',
    image: 'assets/img/winw.jpg',
    price: '1,76 €',
    reference: 'REF.ª 123456789',
    id: 1
  },
  {
    tittle: 'Comidas',
    image: 'assets/img/wines-g681199829_640.jpg',
    price: '2,60 €',
    reference: 'REF.ª 123456789',
    id: 2
  },
  {
    tittle: 'Snacks',
    image: 'assets/img/wines-g681199829_640.jpg',
    price: '1,50 €',
    reference: 'REF.ª 123456789',
    id: 3
  },
  {
    tittle: 'Snacks',
    image: 'assets/img/wines-g681199829_640.jpg',
    price: '1,50 €',
    reference: 'REF.ª 123456789',
    id: 4
  },
  {
    tittle: 'Snacks',
    image: 'assets/img/wines-g681199829_640.jpg',
    price: '1,50 €',
    reference: 'REF.ª 123456789',
    id: 5
  }
  ];

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
  console.log(test);
  }



}
