import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { MoviesService } from '../movies.service';
import {
  Plugins, CameraResultType, Capacitor, FilesystemDirectory,
  CameraPhoto, CameraSource
} from '@capacitor/core';
import { throwIfEmpty } from 'rxjs/operators';
import { Image } from '../image.model';

const { Camera, Filesystem, Storage } = Plugins;

@Component({
  selector: 'app-movie-add',
  templateUrl: './movie-add.page.html',
  styleUrls: ['./movie-add.page.scss'],
})
export class MovieAddPage implements OnInit {

  private image;

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

  async saveNewMovie(title, rating, description) {
    if (!this.image) {
      this.presentToast("You have to choose an image.", "danger");
      return;
    }
    const savedImageFile = await this.moviesService.savePicture(this.image);
    this.moviesService.addMovie(title.value, rating.value, description.value, savedImageFile);
    this.router.navigate(['/movies'])
  }
}
