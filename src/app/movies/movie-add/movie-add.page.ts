import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { MoviesService } from '../movies.service';
import {
  Plugins, CameraResultType
} from '@capacitor/core';

const { Camera } = Plugins;

@Component({
  selector: 'app-movie-add',
  templateUrl: './movie-add.page.html',
  styleUrls: ['./movie-add.page.scss'],
})
export class MovieAddPage implements OnInit {

  private image;
  private selectedRating: number = 1;

  constructor(private moviesService: MoviesService, private router: Router, public toastController: ToastController) { }

  ngOnInit() {
  }


  async getImage() {
    this.image = await Camera.getPhoto({
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

  logRatingChange(rating) {
    this.selectedRating = rating;
  }

  async saveNewMovie(title, description) {
    if (!this.image) {
      this.presentToast("You have to choose an image.", "danger");
      return
    }
    if (!title.value.length) {
      this.presentToast("You have to enter a title.", "danger");
      return
    }
    const savedImageFile = await this.moviesService.savePicture(this.image);
    this.moviesService.addMovie(title.value, this.selectedRating, description.value, savedImageFile);
    this.router.navigate(['/movies'])
  }
}
