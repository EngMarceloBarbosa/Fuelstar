import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { IonicModule } from '@ionic/angular';

import { ProductsDetailsPageRoutingModule } from './products-details-routing.module';

import { ProductsDetailsPage } from './products-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProductsDetailsPageRoutingModule,
    SharedModule
  ],
  declarations: [ProductsDetailsPage]
})
export class ProductsDetailsPageModule {}
