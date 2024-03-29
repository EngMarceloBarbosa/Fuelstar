
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { clientsTab } from '../shared/models/clients-tab1';
import { TasksService } from '../shared/services/tasks.service';

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

  tests = clientsTab


  constructor(private router: Router, public tasksService:TasksService) { }

  definitions() {

  }

  select(id: number) {
    // if (id == 1) {
    //   this.router.navigate(['/orders']);
    //   console.log("entrou");
    //   this.tasksService.controlStep = true;
    //   this.tasksService.controlStep1 = false;
    // }
    // if (id == 2) {
    //   this.router.navigate(['/orders']);
    //   console.log("entrou");
    // }
    // if (id == 3) {
    //   this.router.navigate(['/orders']);
    //   console.log("entrou");
    // }
    // if (id == 4) {
    //   this.router.navigate(['/receipts']);
    //   console.log("entrou");
    // }
  // }

  switch (id) {
    case 1:
      this.router.navigate(['/free-sale']);
      console.log("entrou");
      this.tasksService.controlStep = true;
      this.tasksService.controlStep1 = false;

      break;

     case 2:

     this.router.navigate(['/orders']);
     console.log("entrou");
     this.tasksService.controlStep = true;
     this.tasksService.controlStep1 = false;
     this.tasksService.controlStep2 = false;
     this.tasksService.controlStepCheck2 = false;

     break;

     case 3:
       this.router.navigate(['/survey']);
      console.log("entrou");
      break;

      case 4 :
      this.router.navigate(['/receipts']);
      console.log("entrou");
      break;

      case 5:

        break;


  }


}

}
