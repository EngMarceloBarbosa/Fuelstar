import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ActionSheetService } from '@nc-angular/library-mobile.stg';
import { TranslateService } from '@ngx-translate/core';
import { ContactsTaskService } from '../shared/http/contactsTask-api.service';
import { ItemApiService } from '../shared/http/item-api.service';
import { TaskApiService } from '../shared/http/task-api.service';
import { TasksService } from '../shared/services/tasks.service';

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

  constructor(private translate: TranslateService, public tasksService: TasksService, private router: Router, private actionSheetService: ActionSheetService, private contactsTaskService: ContactsTaskService, public taskApiService: TaskApiService, public itemApiService: ItemApiService) { }


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
    this.itemApiService.getItem().then(res => {
      console.log(res)
      this.tasksService.listItems = res;
      console.log(this.tasksService.listItems, 'LISTA DOS ITEMS');

      // this.tasksService.listTasks$.next(this.listTasks);
    })




    // this.contactsTaskService.getNoteById().then(res => {
    // this.tasksService.listTasksById = res
    // console.log(this.tasksService.listTasksById);
    // } )


  }


  close() {
    this.router.navigate(['orders'])
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

  subFamily(child) {
    if(child.id){
      this.router.navigate(['products-family']);
      this.itemApiService.getItems(child.id).then(res => {
        this.tasksService.listItemsByType = res;
        console.log(this.tasksService.listItemsByType)
        })

    }

    console.log(child)
    // this.tasksService.listItems[0].children.map((element) => {
    //   if (element.id === test.id) {
    //     console.log("ENTROU NO RPIMEIRO item")
    //     this.router.navigate(['products-family']);
    //   }
    //   if (test.id === "00000000-0000-0000-0000-000000000204") {
    //     console.log("ENTROU NO RPIMEIRO item")
    //     this.router.navigate(['products-family']);
    //   }
    // }
    // )
    // if (test.id == 1) {
    //   // this.tasksService.putImageItems();
    //   this.router.navigate(['products-family']);
    // } if (test.id == 2) {
    //   this.router.navigate(['tabs/tab2']);
    // } if (test.id == 3) {
    //   this.router.navigate(['tabs/tab3']);
    // }
  }

}
