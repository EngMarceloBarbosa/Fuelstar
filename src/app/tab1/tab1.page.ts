import { Location } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NavController, ToastController } from '@ionic/angular';
import { ActionSheetModel, ActionSheetService } from '@nc-angular/library-mobile.stg';
import { ContactsTaskService } from '../shared/http/contactsTask-api.service';
import { TaskApiService } from '../shared/http/task-api.service';
import { clientsTab } from '../shared/models/clients-tab1';
import { ProductService } from '../shared/services/product.service';
import { TasksService } from '../shared/services/tasks.service';




@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {


  @ViewChild('toDO', {static:false}) toDo



  cardHeight = 0;
  cardHeight1 = 0;

  name: string = "Jimmy Smyth";

  position: any[] = [
    {
      name1: 'Joao',
      position1: 'operator',
    },
    {
      name1: 'Marco',
      position1: 'operator',
    }
  ];

  visits: any = "Visitas para hoje"

  result: string;

  tests = clientsTab
  globalMessagesTranslations: any;
  loginMessagesTranslations: any;
  productsMessagesTranslations: any;


  constructor(
    private router: Router,
    private nav: NavController,
    private loc: Location,
    public tasksService: TasksService,
    private actionSheetService: ActionSheetService,
    private productService: ProductService,
    public toastController: ToastController,
    public taskApiService: TaskApiService,
    public contactsTaskService: ContactsTaskService,
    private element: ElementRef
  ) {


   }

  async ngOnInit() {

      await this.contactsTaskService.getEntities().then(res => {
        console.log(res)
        this.tasksService.listClients = res;
        // this.tasksService.listTasks$.next(this.listTasks);
      })
      this.tasksService.allDocumentsFilter = this.tasksService.listClients



    await this.taskApiService.getTasks().then(res => {
      console.log(res)
      this.tasksService.listTasks = res;
      // this.tasksService.listTasks.forEach((task) => {
      //   this.tasksService.listTasksItemId = task.item.id
      // } )
      this.tasksService.visiteToDo = this.tasksService.listTasks
      console.log(this.tasksService.visiteToDo)

      this.tasksService.countVisits  = this.tasksService.visiteToDo.length
      console.log(this.tasksService.countVisits)
      this.tasksService.countsToDo =  this.tasksService.listTasks.length-this.tasksService.countVisits


      // this.tasksService.listTasks$.next(this.listTasks);
    })


    await this.taskApiService.getTasksItemId().then(res => {
      this.tasksService.listTasks1 = res;
      console.log(this.tasksService.listTasks1)

    })


    this.randomNumber(1, 1000);


    // this.contactsTaskService.getNoteById().then(res => {
    // this.tasksService.listTasksById = res
    // console.log(this.tasksService.listTasksById);
    // } )
    this.registration();
    setTimeout(() => {
      const virtualScroller = this.element.nativeElement.querySelector('.toDO nc-virtual-scroller')
      const scrollable = virtualScroller.querySelector('.scrollable-content')
      this.cardHeight = this.tasksService.listTasks.length * 44;
      this.cardHeight1 = this.tasksService.listTasks.length * 8.3;
      virtualScroller.style.height = `${40}vh`;
      scrollable.style.height = `${this.cardHeight}px`;


    }, 300);

  }


ngAfterViewInit(){

}


     randomNumber(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max)
    this.tasksService.random = Math.floor(Math.random() * (max - min)) + min;
    console.log(this.tasksService.random)
  }



  back() {
    //  this.loc.back();
    this.router.navigate(['/']);
  }

  selectedTask(test: any) {
console.log(test)
    if (test.id) {
      this.tasksService.infoClient$.next(test);
      console.log(test);
      console.log("1 entrou");
    }
    if (test.id == 2) {
      console.log("2 entrou");
    }

    this.router.navigate(['/details-client'])
  }

  definitions() {
    const temp: ActionSheetModel = {
      titleText: "TRAJETO",
      titleTextColor: 'c-scale-12',
      titleTextSize: "small",
      iconHeader: 'icon_send',
      iconHeaderSize: 12,
      iconHeaderColor: 'c-scale-12',

    };

    // const temp = document.createElement('ion-action-sheet');

    this.actionSheetService.open(temp);

  }

  definitions1() {
    this.router.navigate(['settings'])
  }

  async send() {
    const toast = await this.toastController.create({
      header: 'Chegou ao destino de David Sanchez',
      message: '4765-400 | Braga - Guimarães',
      position: 'top',
      color: 'light',
      duration: 1000,
      buttons: [
        {
          side: 'start',
          icon: 'pin',
          handler: () => {
            console.log('Favorite clicked');
          }
        },
        {
          side: 'end',
          icon: 'close',
          handler: () => {
            console.log('Favorite clicked');
          }
        }
      ]
    });
    await toast.present();


  }

  boxDone(){
    this.visits = "Visitas efectuadas"
    this.tasksService.toDo = false
  }

  boxToDo(){
    this.visits = "Visitas para hoje"
    this.tasksService.toDo = true
  }



  localization(){

    this.router.navigate(['/google-maps'])


  }


  registration(){
    this.tasksService.visiteToDo = this.tasksService.listTasks1
    this.tasksService.countVisits = this.tasksService.listTasks1.length
    console.log(this.tasksService.listTasks)
  }


}

