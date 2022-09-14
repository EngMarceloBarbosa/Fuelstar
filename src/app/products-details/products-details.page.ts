
import { Component, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { ActionSheetModel, ActionSheetService } from '@nc-angular/library-mobile.stg';
import { TranslateService } from '@ngx-translate/core';
import { ProductService } from '../shared/services/product.service';
import { product } from '../shared/models/product-list';
import { TasksService } from '../shared/services/tasks.service';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-products-details',
  templateUrl: './products-details.page.html',
  styleUrls: ['./products-details.page.scss'],
})
export class ProductsDetailsPage implements OnInit {


  active: boolean = true;

  item: any;
  globalMessagesTranslations:any;
  loginMessagesTranslations:any;
  productsMessagesTranslations:any;
  badgeNew: number;
  ammount = 1;
  ammountNew:any;


  constructor(
    private router: Router,
    public toastController: ToastController,
    public tasksService: TasksService,
    private actionSheetService: ActionSheetService,
    private productService: ProductService,
    private translate: TranslateService) { }


  ngOnInit() {

    this.translate.get('App').subscribe(res => {
      this.globalMessagesTranslations = res.Global;
      this.loginMessagesTranslations = res.Login;
      this.productsMessagesTranslations = res.ProductDetails;

    });
    this.tasksService.badgeEmpty$
    .subscribe(testTask1 => {
      this.badgeNew = testTask1;
    }),
    this.tasksService.ammountNew$
    .subscribe(testTask1 => {
      this.ammountNew = testTask1;
    })


    // this.tasksService.chooseProduct$
    //   .subscribe(testTask1 => {
    //     this.tasksService.itemSelected = testTask1;

    //   }),
      // this.tasksService.valueTotal$
      // .subscribe(testTask4 => {
      //   this.listValue = testTask4;
      //   console.log(this.listValue, "ENTROU")
      // })
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Your settings have been saved.',
      duration: 500
    });
    toast.present();
  }

  async addProduct(product) {
    this.tasksService.badge = ++this.tasksService.badge;
    console.log(this.tasksService.quantity1)
    this.tasksService.controlBadge = false;
    this.productService.addValueProduct(product,this.ammount);
    this.productService.totalValueOrder()
    const toast = await this.toastController.create({
      header: 'Adicionado produto ao Carrinho',
      message: this.tasksService.quantity1 ,
      position: 'top',
      color: 'light',
      duration: 500,
    });
    await toast.present();


  }


  back() {

    this.router.navigate(['products-family']);
    this.tasksService.quantity2 = 0;





  // if(this.tasksService.quantity2 == 0) {
  //   this.tasksService.controlBadge = true;
  // }
  }

  add() {

  }


  options() {
    const temp: ActionSheetModel = {
      titleText: this.productsMessagesTranslations.titleActionSheet,
      titleTextColor: 'c-scale-12',
      titleTextSize: 'large',
      iconHeader: 'icon_options',
      iconHeaderSize: 16,
      iconHeaderColor: 'c-scale-12',
      rightButtonShow: true,
      rightButtonText: 'Aplicar filtros',
      rightButtonColor: 'primary',
      rightButtonCallback: () => {
        this.handleApplyFilter();
      },
      middleButtonShow: false,
      leftButtonShow: true,
      leftButtonText: 'Apagar',
      leftButtonColor: 'c-scale-12',
      closeButtonShow: true,
      closeButtonColor: 'c-scale-12'
    };

    this.actionSheetService.open(temp);
  }

  handleApplyFilter() {
    this.router.navigate(['/tabs/tab4'])
  }

  quantity() {
    this.router.navigate(['/tabs/tab4'])
  }

  showCart(badge: any, item) {

    console.log(item)
    if (this.tasksService.controlBadge == true) {

    } else {

      console.log("BOAS")
      this.router.navigate(['/orders-details']);
      this.tasksService.badge = badge
      this.tasksService.controlBadge = false;
      this.tasksService.controlStep = true;
      this.tasksService.controlStep1 = true;
      this.tasksService.controlStepCheck = true;
      this.tasksService.controlStepCheckk = true;
      this.tasksService.controlStepCheck1 = false;
      this.tasksService.controlStepCheckk1 = false;
      // if(this.tasksService.productList.length !== 0){
      //   this.tasksService.productList.map((elem)=> {
      //     if(elem.id == item.id ){

      //       this.tasksService.quantity2 = elem.quantity;
      //     }
      //     // else {
      //     //   r
      //     // }

      //   })
      // }

    }
  }

  show(value1){
    this.tasksService.controlBadge = true;
    this.tasksService.quantity2 = value1
console.log(value1);
  }

  send(){

  }
}
