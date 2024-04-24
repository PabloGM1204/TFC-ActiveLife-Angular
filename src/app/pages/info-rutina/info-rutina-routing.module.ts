import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InfoRutinaPage } from './info-rutina.page';

const routes: Routes = [
  {
    path: ':id',
    component: InfoRutinaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InfoRutinaPageRoutingModule {}
