import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss'],
})
export class ProductsPage implements OnInit {

  active: boolean = true;
  activeTest: boolean = false;

  signupForm: FormGroup;
  signupSuccess = false;
  alertText = '';
  type = '';




  entitiesListFilter: any;
  id: number;

  constructor(private router: Router) { }


  products1: any[] = [{
    family: 'bebidas',
    subfamily: 'vinhos',
    image: 'assets/img/2050435-frente.jpg',
    price: '1,76 €',
    validade: '12/12/2021',
    id: 1
  },
  {
    family: 'Comidas',
    subfamily: 'Bolachas',
    image: 'assets/img/22611190-crackers-isolated-on-a-white-background.jpg',
    price: '2,60 €',
    validade: '12/03/2011',
    id: 2
  },
  {
    family: 'Snacks',
    subfamily: 'Batatas Fritas',
    image: 'assets/img/8915830145054.jpg',
    price: '1,50 €',
    validade: '12/11/2022',
    id: 3
  }
  ];



  ngOnInit() {
  }


  close() {

  }

  products() {
    this.active = false;
    this.activeTest = true;
  }

  service() {
    console.log("boas")
    this.active = true;
    this.activeTest = false;
  }

  clickTab(event: any) {

  }

  subFamily(test){
    if(test.id == 1 ){
    this.router.navigate(['products-family']);
    } if(test.id == 2) {
      this.router.navigate(['tabs/tab2']);
    }if(test.id == 3) {
      this.router.navigate(['tabs/tab3']);
    }
  }

}
