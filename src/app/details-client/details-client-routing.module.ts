import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetailsClientPage } from './details-client.page';

const routes: Routes = [
  {
    path: '',
    component: DetailsClientPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetailsClientPageRoutingModule {}
