import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { Movie } from '../movie.model';
import { MoviesService } from '../movies.service';

@Component({
  selector: 'app-movie-edit',
  templateUrl: './movie-edit.page.html',
  styleUrls: ['./movie-edit.page.scss'],
})
export class MovieEditPage implements OnInit {

  private movie: Movie;

  constructor(private activatedRoute: ActivatedRoute, private movieService: MoviesService, private router: Router) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(paramMap => {
      const recipeId = paramMap.get('movieId');
      this.movie = this.movieService.getMovieById(recipeId);
    })
  }

  editMovie(id, title, rating, description, imageURL) {
    this.movieService.updateMovie(id, title.value, rating.value, description.value, imageURL.value);
    this.router.navigate(['/movies']);
  }
}
