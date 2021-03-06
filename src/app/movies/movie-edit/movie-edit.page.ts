import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { ActivatedRoute, Router } from "@angular/router";
import { Image } from '../../image.model';
import { Movie } from '../movie.model';
import { MoviesService } from '../movies.service';
import {
  Plugins, CameraResultType, Capacitor, FilesystemDirectory,
  CameraPhoto, CameraSource
} from '@capacitor/core';
import { ImageService } from 'src/app/image.service';
const { Camera, Filesystem, Storage } = Plugins;

@Component({
  selector: 'app-movie-edit',
  templateUrl: './movie-edit.page.html',
  styleUrls: ['./movie-edit.page.scss'],
})
export class MovieEditPage implements OnInit {

  private movie: Movie;
  private newImage;
  private selectedRating: number;

  constructor(private activatedRoute: ActivatedRoute, private moviesService: MoviesService, private router: Router, public toastController: ToastController, private imageService: ImageService) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(paramMap => {
      const recipeId = parseInt(paramMap.get('movieId'));
      this.movie = this.moviesService.getMovieById(recipeId);
    })
    this.selectedRating = this.movie.rating;
  }

  logRatingChange(rating) {
    this.selectedRating = rating;
  }

  async getImage() {
    this.newImage = await Camera.getPhoto({
      quality: 100,
      allowEditing: false,
      resultType: CameraResultType.Uri
    });
  }

  async presentToast(message: string, color: string) {
    const toast = await this.toastController.create({
      position: 'top',
      message: message,
      duration: 3000,
      color: color,
    });
    toast.present();
  }


  async editMovie(id: number, title, description) {
    if (!title.value.length) {
      this.presentToast("You have to enter a title.", "danger");
      return
    }
    if (this.newImage) {
      this.imageService.removeImage(this.movie.image);
      const savedImageFile = await this.imageService.savePicture(this.newImage);
      this.moviesService.updateMovie(id, title.value, this.selectedRating, description.value, savedImageFile);
    } else {
      this.moviesService.updateMovie(id, title.value, this.selectedRating, description.value, this.movie.image);
    }
    this.router.navigate(['/movies']);
  }
}


