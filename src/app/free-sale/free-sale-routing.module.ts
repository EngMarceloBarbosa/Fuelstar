import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FreeSalePage } from './free-sale.page';

const routes: Routes = [
  {
    path: '',
    component: FreeSalePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FreeSalePageRoutingModule {}
