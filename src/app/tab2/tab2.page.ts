
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { tasksTest } from '../utils/models/tasks';
@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page {
  name: string = "Jimmy Smyth";


  products: any[] = [{
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

  tests: tasksTest[] = [

    {
      title: 'boas',
      date: '23-23-1982',
      id: 1,
      name: 'Joao',
      price: 1.4,
      description: 'Lisboa '
    },
    {
      title: 'boas',
      date: '23-23-1982',
      id: 2,
      name: 'Gustavo',
      price: 1.43,
      description: 'Porto'
    },
    {
      title: 'boas',
      date: '23-23-1982',
      id: 3,
      name: 'Antonio',
      price: 1.43,
      description: 'Régua'
    },
    {
      title: 'boas',
      date: '23-23-1982',
      id: 3,
      name: 'Rega',
      price: 1.43,
      description: 'Capital'
    },
    {
      title: 'boas',
      date: '23-23-1982',
      id: 3,
      name: 'Couto',
      price: 1.43,
      description: 'Algarve'
    },
    {
      title: 'boas',
      date: '23-23-1982',
      id: 3,
      name: 'Pedro',
      price: 1.43,
      description: 'Lousada'
    },
  ]

  constructor(private router: Router) { }

  definitions() {

  }

  select(id: number) {
    if (id == 1) {
      this.router.navigate(['/orders']);
      console.log("entrou");
    }
    if (id == 2) {
      this.router.navigate(['/orders']);
      console.log("entrou");
    }
    if (id == 3) {
      this.router.navigate(['/orders']);
      console.log("entrou");
    }
    if (id == 4) {
      this.router.navigate(['/receipts']);
      console.log("entrou");
    }
  }

}
