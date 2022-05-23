import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { IonicModule } from '@ionic/angular';

import { ProductsFamilyPageRoutingModule } from './products-family-routing.module';

import { ProductsFamilyPage } from './products-family.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProductsFamilyPageRoutingModule,
    SharedModule
  ],
  declarations: [ProductsFamilyPage]
})
export class ProductsFamilyPageModule {}
