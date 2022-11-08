
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { GoogleMapsPage } from './google-maps.page';

const routes: Routes = [
  {
    path: '',
    component: GoogleMapsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GoogleMapsPageRoutingModule {}
