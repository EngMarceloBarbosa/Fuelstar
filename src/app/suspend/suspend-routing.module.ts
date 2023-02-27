import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SuspendPage } from './suspend.page';

const routes: Routes = [
  {
    path: '',
    component: SuspendPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SuspendPageRoutingModule {}
