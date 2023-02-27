import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SuspendPageRoutingModule } from './suspend-routing.module';
import { SharedModule } from '../shared/shared.module';
import { SuspendPage } from './suspend.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SuspendPageRoutingModule,
    SharedModule,
  ],
  declarations: [SuspendPage]
})
export class SuspendPageModule {}
