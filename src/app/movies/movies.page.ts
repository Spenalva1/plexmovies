import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MoviesService } from './movies.service'
import { Movie } from './movie.model'
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.page.html',
  styleUrls: ['./movies.page.scss'],
})
export class MoviesPage implements OnInit {

  constructor(private movieService: MoviesService, private router: Router) { }

  ngOnInit() {
    this.movieService.getSavedMovies();
  }

  async ionViewDidEnter() {
    this.movieService.getSavedMovies();
  }

  addMovie() {
    this.router.navigate(["/new-movie"]);
  }

}
