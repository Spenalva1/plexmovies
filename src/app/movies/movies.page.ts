import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MoviesService } from './movies.service'

@Component({
  selector: 'app-movies',
  templateUrl: './movies.page.html',
  styleUrls: ['./movies.page.scss'],
})
export class MoviesPage implements OnInit {

  private movies = [];

  constructor(private movieService: MoviesService, private router: Router) { }

  ngOnInit() {
    this.movies = this.movieService.getMovies();
  }

  ionViewWillEnter() {
    this.movies = this.movieService.getMovies();
  }

  addMovie() {
    this.router.navigate(["/new-movie"]);
  }

}
