import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';

import { IonicModule } from '@ionic/angular';

import { DeletePagePageRoutingModule } from './delete-page-routing.module';

import { DeletePagePage } from './delete-page.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DeletePagePageRoutingModule,
    SharedModule
  ],
  declarations: [DeletePagePage]
})
export class DeletePagePageModule {}
