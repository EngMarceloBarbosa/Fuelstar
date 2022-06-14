import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';

import { IonicModule } from '@ionic/angular';

import { FinishOrderRoutingModule } from './finish-order.routing.module';

import { FinishOrderPage } from './finish-order.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FinishOrderRoutingModule,
    SharedModule
  ],
  declarations: [FinishOrderPage]
})
export class FinishOrderPageModule {}
