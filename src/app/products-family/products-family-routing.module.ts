import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductsFamilyPage } from './products-family.page';

const routes: Routes = [
  {
    path: '',
    component: ProductsFamilyPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductsFamilyPageRoutingModule {}
