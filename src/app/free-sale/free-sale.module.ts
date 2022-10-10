import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FreeSalePageRoutingModule } from './free-sale-routing.module';

import { FreeSalePage } from './free-sale.page';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FreeSalePageRoutingModule,
    SharedModule
  ],
  declarations: [FreeSalePage]
})
export class FreeSalePageModule {}
