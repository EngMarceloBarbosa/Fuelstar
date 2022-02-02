import { Component } from '@angular/core';
import { Boxes } from './tab2';


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page {



  isOnColor = true;
  listBoxes: Boxes[] = [];
  listBoxes1: any[] = [{
  }];



  tests: any[] = [{
  id: 1,
  name: 'Joao',
  price: 1.4,
  description: 'Work hard '
},
{
  id: 2,
  name: 'Gustavo',
  price: 1.43,
  description: 'No one is like you'
},
{
  id: 3,
  name: 'Antonio',
  price: 1.43,
  description: 'Always you'
},

{
  id: 4,
  name: 'Leo',
  price: 1.43,
  description: 'Nothing really matters'
},
{
  id: 5,
  name: 'Joao',
  price: 1.33,
  description: 'just do it'
},

{
  id: 6,
  name: 'Berto',
  price: 1.633,
  description: 'Be smart'
},
{
  id: 7,
  name: 'Sapo',
  price: 16.3,
  description: 'Nothing new'
},
{
  id: 8,
  name: 'Benfica',
  price: 19,
  description: 'Be powerful'
}
];


constructor() {
}

}



