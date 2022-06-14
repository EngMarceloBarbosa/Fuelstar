import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FinishOrderPage } from './finish-order.page';

const routes: Routes = [
  {
    path: '',
    component: FinishOrderPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FinishOrderRoutingModule {}
