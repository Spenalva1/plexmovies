import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MovieEditPage } from './movie-edit.page';

const routes: Routes = [
  {
    path: '',
    component: MovieEditPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MovieEditPageRoutingModule {}
