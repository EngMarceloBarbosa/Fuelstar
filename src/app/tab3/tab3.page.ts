import { Component } from '@angular/core';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {


  products: any[]  = [{
  family: 'bebidas',
  subfamily: 'vinhos',
  image: 'assets/img/2050435-frente.jpg',
  price: '1,76 €',
  validade: '12/12/2021'
  },
  {
  family: 'Comidas',
  subfamily: 'Bolachas',
  image: 'assets/img/22611190-crackers-isolated-on-a-white-background.jpg',
  price: '2,60 €',
  validade: '12/03/2011'
  },
  {
  family: 'Comidas',
  subfamily: 'Batatas Fritas',
  image: 'assets/img/8915830145054.jpg',
  price: '1,50 €',
  validade: '12/11/2022'
  }
];


constructor() {}

}

