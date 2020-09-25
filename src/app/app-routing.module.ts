import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
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
  },
  {
    path: 'movie-edit/:movieId',
    loadChildren: () => import('./movies/movie-edit/movie-edit.module').then(m => m.MovieEditPageModule),
  },
  {
    path: 'login',
    loadChildren: () => import('./auth/login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./auth/register/register.module').then(m => m.RegisterPageModule)
  },
  {
    path: 'verify-email',
    loadChildren: () => import('./auth/verify-email/verify-email.module').then(m => m.VerifyEmailPageModule)
  },
  {
    path: 'forgot-password',
    loadChildren: () => import('./auth/forgot-password/forgot-password.module').then(m => m.ForgotPasswordPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
