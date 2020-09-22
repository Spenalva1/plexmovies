import { Component, OnInit } from '@angular/core';
import { AlertController } from "@ionic/angular";
import { ActivatedRoute, Router } from "@angular/router";
import { Movie } from '../movie.model';
import { MoviesService } from '../movies.service';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.page.html',
  styleUrls: ['./movie-detail.page.scss'],
})
export class MovieDetailPage implements OnInit {

  private movie: Movie;

  constructor(private activatedRoute: ActivatedRoute, private movieService: MoviesService, private router: Router, private alertController: AlertController) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(paramMap => {
      const recipeId = parseInt(paramMap.get('movieId'));
      this.movie = this.movieService.getMovieById(recipeId);
    })
  }

  async removeMovie() {

    const alertElement = await this.alertController.create({
      header: 'Are you sure you want to delete it?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'Delete',
          handler: () => {
            this.movieService.removeMovie(this.movie.id);
            this.router.navigate(['/movies']);
          }
        }
      ]
    });

    await alertElement.present();

  }

}
