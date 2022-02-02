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
  image: 'assets/img/2050435-frente.jpg'
  },
  {
  family: 'Comidas',
  subfamily: 'Bolachas',
  image: 'assets/img/617_bolachas.jpg'
  }
];



constructor() {}

}
