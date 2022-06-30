import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { IonicModule } from '@ionic/angular';

import { DetailsClientPageRoutingModule } from './details-client-routing.module';

import { DetailsClientPage } from './details-client.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetailsClientPageRoutingModule,
    SharedModule
  ],
  declarations: [DetailsClientPage]
})
export class DetailsClientPageModule {}
