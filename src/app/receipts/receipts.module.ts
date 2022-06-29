import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReceiptsPageRoutingModule } from './receipts-routing.module';
import { SharedModule } from '../shared/shared.module';
import { ReceiptsPage } from './receipts.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    ReceiptsPageRoutingModule,
    SharedModule
  ],
  declarations: [ReceiptsPage]
})
export class ReceiptsPageModule {}
