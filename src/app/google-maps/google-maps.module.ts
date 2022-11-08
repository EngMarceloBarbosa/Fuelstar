import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { IonicModule } from '@ionic/angular';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { GoogleMapsPageRoutingModule } from './google-maps-routing.module';

import { GoogleMapsPage } from './google-maps.page';

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GoogleMapsPageRoutingModule,
    SharedModule
  ],
  declarations: [GoogleMapsPage]
})
export class GoogleMapsPageModule {}
