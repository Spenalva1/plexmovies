import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { Image } from '../image.model';
import { Movie } from '../movie.model';
import { MoviesService } from '../movies.service';
import {
  Plugins, CameraResultType, Capacitor, FilesystemDirectory,
  CameraPhoto, CameraSource
} from '@capacitor/core';
const { Camera, Filesystem, Storage } = Plugins;

@Component({
  selector: 'app-movie-edit',
  templateUrl: './movie-edit.page.html',
  styleUrls: ['./movie-edit.page.scss'],
})
export class MovieEditPage implements OnInit {

  private movie: Movie;
  private newImage;

  constructor(private activatedRoute: ActivatedRoute, private moviesService: MoviesService, private router: Router) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(paramMap => {
      const recipeId = parseInt(paramMap.get('movieId'));
      this.movie = this.moviesService.getMovieById(recipeId);
    })
  }

  async getImage() {
    this.newImage = await Camera.getPhoto({
      quality: 100,
      allowEditing: false,
      resultType: CameraResultType.Uri
    });
  }

  async editMovie(id: number, title, rating, description) {
    if (this.newImage) {
      this.moviesService.removeImage(this.movie.image);
      const savedImageFile = await this.moviesService.savePicture(this.newImage);
      this.moviesService.updateMovie(id, title.value, rating.value, description.value, savedImageFile);
    } else {
      this.moviesService.updateMovie(id, title.value, rating.value, description.value, this.movie.image);
    }
    this.router.navigate(['/movies']);
  }
}
