import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'movies',
    pathMatch: 'full'
  },
  {
    path: 'movies',
    children: [
      {
        path: "",
        loadChildren: () => import('./movies/movies.module').then(m => m.MoviesPageModule)
      },
      {
        path: ":movieId",
        loadChildren: () => import('./movies/movie-detail/movie-detail.module').then(m => m.MovieDetailPageModule)
      }
    ]
  },
  {
    path: 'new-movie',
    loadChildren: () => import('./movies/movie-add/movie-add.module').then(m => m.MovieAddPageModule),
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
