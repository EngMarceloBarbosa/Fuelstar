
import { Component, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { ActionSheetModel, ActionSheetService } from '@nc-angular/library-mobile.stg';
import { TranslateService } from '@ngx-translate/core';
import { ProductService } from '../shared/services/product.service';
import { product } from '../shared/models/product-list';
import { TasksService } from '../shared/services/tasks.service';

@Component({
  selector: 'app-products-details',
  templateUrl: './products-details.page.html',
  styleUrls: ['./products-details.page.scss'],
})
export class ProductsDetailsPage implements OnInit {
  itemProduct: any;
  product2 = product
  active: boolean = true;
  @Input() badge: number = 0;
  controlBadge: boolean = true;
  item: any;
  listValue:any;
  globalMessagesTranslations:any;
  loginMessagesTranslations:any;
  productsMessagesTranslations:any;
  badgeNew: number;

  constructor(
    private router: Router,
    public toastController: ToastController,
    private tasksService: TasksService,
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


    this.tasksService.chooseProduct$
      .subscribe(testTask1 => {
        this.itemProduct = testTask1;
      }),
      this.tasksService.valueTotal$
      .subscribe(testTask4 => {
        this.listValue = testTask4;
        console.log(this.listValue, "ENTROU")
      })
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Your settings have been saved.',
      duration: 500
    });
    toast.present();
  }

  async addProduct(product) {
    this.badge = ++this.badge;
    this.controlBadge = false;
    const toast = await this.toastController.create({
      header: 'You add new product to cart "item xpto',
      message: 'Back to Articles lis t cart',
      position: 'top',
      color: 'light',
      duration: 500,
    });
    await toast.present();

this.productService.addValueProduct(product);
this.productService.totalValueOrder()

  }


  back() {
    this.router.navigate(['products-family']);

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

  showCart(badge: any) {
    if (this.controlBadge == true) {

    } else {
      console.log("BOAS")
      this.router.navigate(['/orders-details']);
      this.tasksService.badge$.next(badge);
      this.controlBadge = false;
    }
  }
}
