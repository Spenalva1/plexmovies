import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MoviesPage } from './movies.page';

const routes: Routes = [
  {
    path: '',
    component: MoviesPage
  },
  {
    path: 'movie-detail',
    loadChildren: () => import('./movie-detail/movie-detail.module').then( m => m.MovieDetailPageModule)
  },
  {
    path: 'movie-add',
    loadChildren: () => import('./movie-add/movie-add.module').then( m => m.MovieAddPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MoviesPageRoutingModule {}
