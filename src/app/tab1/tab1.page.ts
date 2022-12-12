import { Location } from '@angular/common';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { AfterContentChecked, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonSlides, NavController, ToastController } from '@ionic/angular';
import { ActionSheetModel, ActionSheetService } from '@nc-angular/library-mobile.stg';
import { SwiperComponent } from 'swiper/angular';
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
export class Tab1Page implements OnInit, AfterContentChecked {


  @ViewChild('toDO', { static: true }) toDo
  @ViewChild('toDO1', { static: true }) toDo1
  @ViewChild('action1', { static: false }) action1
  @ViewChild('action2', { static: false }) action2
  @ViewChild('swiper') swiper: SwiperComponent;
  @ViewChild('slide', { static: false }) slide: IonSlides
  @ViewChild('action1') input: ElementRef;


  positionSlide: any = 0;
  change = false;
  check = true;
  cardHeight = 0;
  cardHeight1 = 0;
  turnAction = false;
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


  slideOpts = {
    initialSlide: 0,
    speed: 300
  };


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


  ngAfterContentChecked(): void {
    if (this.swiper) {
      this.swiper.updateSwiper({});
    }
  }

  async ngOnInit() {

    console.log(this.positionSlide)


    if (this.tasksService.visiteEfected.length === 0) {
      this.tasksService.turnMsgAlertTask1 = true;
      this.tasksService.msgAlertTasks1 = "Ainda não se encontram tarefas concluídas"
    } else {
      this.tasksService.turnMsgAlertTask1 = false;
    }



    console.log(this.tasksService.toDo)
    await this.contactsTaskService.getEntities().then(res => {
      console.log(res)
      this.tasksService.listClients = res;
    })
    this.tasksService.allDocumentsFilter = this.tasksService.listClients


    await this.contactsTaskService.getEntitiesClients().then(res => {
      console.log(res)
      this.tasksService.listClients1 = res;
      console.log(this.tasksService.listClients1)
    })
    this.tasksService.allDocumentsFilter = this.tasksService.listClients




    // await this.taskApiService.getTasks().then(res => {
    //   console.log(res)
    //   this.tasksService.listTasks = res;
    //   console.log(this.tasksService.visiteToDo)

    //   this.tasksService.countVisits  = this.tasksService.visiteToDo.length
    //   console.log(this.tasksService.countVisits)
    //   this.tasksService.countsToDo =  this.tasksService.listTasks.length-this.tasksService.countVisits
    // })


    await this.taskApiService.getTasksItemId().then(res => {
      this.tasksService.listTasks1 = res;
      this.tasksService.visiteToDo = this.tasksService.listTasks1;
      console.log(this.tasksService.listTasks1)
      this.tasksService.countVisits = this.tasksService.visiteToDo.length
      console.log(this.tasksService.countVisits)
      this.tasksService.countsToDo = this.tasksService.listTasks1.length - this.tasksService.countVisits


    })


    this.randomNumber(1, 1000);
    this.virtualScroller();
    this.registration();

    console.log(this.tasksService.visiteToDo)
    console.log(this.tasksService.visiteEfected)
  }


  ngAfterViewInit() {
    console.log(this.input)
    // console.log(this.input1)
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

    this.turnAction = false;

    console.log(this.input)
    const temp: ActionSheetModel = {
      titleText: "TRAJETO",
      titleTextColor: 'c-scale-12',
      titleTextSize: "small",
      iconHeader: 'icon_send',
      iconHeaderSize: 12,
      iconHeaderColor: 'c-scale-12',
    };
    // this.actionSheetService.open(temp);
    this.action1?.open(temp);
    console.log(this.action1)
    console.log(this.input)

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

  boxDone() {

    this.visits = "Visitas efectuadas"
    this.tasksService.toDo = false
    console.log(this.tasksService.toDo)
    if (this.tasksService.visiteEfected.length === 0) {
      this.tasksService.turnMsgAlertTask = true;
      this.tasksService.msgAlertTasks = "Ainda não se encontram tarefas concluídas"
    } else {
      this.tasksService.turnMsgAlertTask = false;
    }

    this.virtualScroller();

  }

  boxToDo() {
    this.visits = "Visitas para hoje"
    this.tasksService.toDo = true
    console.log(this.tasksService.toDo)

    if (this.tasksService.visiteToDo.length === 0) {
      this.tasksService.turnMsgAlertTask = true;
      this.tasksService.msgAlertTasks = "Não existe mais tarefas"
    } else {
      this.tasksService.turnMsgAlertTask = false;
    }

    this.virtualScroller();

  }



  localization() {

    this.router.navigate(['/google-maps'])


  }


  registration() {
    this.tasksService.visiteToDo = this.tasksService.listTasks1
    this.tasksService.countVisits = this.tasksService.listTasks1.length
    console.log(this.tasksService.listTasks)
  }

  virtualScroller() {
    setTimeout(() => {



      const virtualScroller = this.element.nativeElement.querySelector('.toDO nc-virtual-scroller')
      const scrollable = virtualScroller.querySelector('.scrollable-content')
      this.cardHeight = this.tasksService.listTasks1.length * 44;
      this.cardHeight1 = this.tasksService.listTasks1.length * 8.3;
      virtualScroller.style.height = `${33}vh`;
      scrollable.style.height = `${this.cardHeight}px`;
      console.log(scrollable.style.height)
      console.log(virtualScroller.style.height)

    }, 1);

  }

  operationType() {

    this.turnAction = true;
    const temp1: ActionSheetModel = {
      titleText: "FILTER BY",
      titleTextColor: 'c-scale-12',
      titleTextSize: 'large',
      iconHeader: 'icon_options',
      iconHeaderSize: 16,
      iconHeaderColor: 'c-scale-12',
      rightButtonShow: true,
      rightButtonText: 'Aplicar filtros',
      rightButtonColor: 'primary',

    };

    // this.actionSheetService.open(temp1);
    this.action2?.open(temp1);
  }


  // slideChange(event){




  // }


  slideChanged() {
    console.log(this.positionSlide)
    this.slide.getActiveIndex().then(index => {
      console.log(index)

      this.positionSlide = index

    })
    console.log(this.change)
    this.virtualScroller1();





    if (this.positionSlide == 0) {
      this.change = true;
    }
    if (this.positionSlide == 1) {
      this.change = false;
    }



  }







  // slideChanged1(){

  //   this.slides.nativeElement.getActiveIndex().then(index => {
  //     console.log(index);
  //  });



  // }



  // ionSlideTransitionStart(){
  //   this.change = false;
  // }



  virtualScroller1() {
    setTimeout(() => {

      const virtualScroller = this.element.nativeElement.querySelector('.toDO1 nc-virtual-scroller')
      const scrollable = virtualScroller.querySelector('.scrollable-content')
      this.cardHeight = this.tasksService.listTasks1.length * 44;
      this.cardHeight1 = this.tasksService.listTasks1.length * 8.3;
      virtualScroller.style.height = `${33}vh`;
      scrollable.style.height = `${this.cardHeight}px`;


      console.log(scrollable.style.height)
      console.log(virtualScroller.style.height)

    }, 1);

  }

}

