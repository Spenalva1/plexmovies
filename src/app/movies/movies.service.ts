import { Injectable } from '@angular/core';
import { Movie } from './movie.model'
import { Image } from './image.model'
import {
  Plugins, CameraResultType, Capacitor, FilesystemDirectory,
  CameraPhoto, CameraSource
} from '@capacitor/core';

const { Camera, Filesystem, Storage } = Plugins;

import { Platform } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  public movies: Movie[] = [];
  private MOVIE_STORAGE: string = "movies";
  private platform: Platform;


  // private movies: Movie[] = [
  //   {
  //     id: '1',
  //     title: 'Titanic',
  //     rating: 4,
  //     description: ' Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque, ea architecto libero fugiat pariatur soluta, nostrum voluptates expedita inventore doloribus ipsa officiis optio itaque voluptate illo? Temporibus accusantium est necessitatibus!j',
  //     // imageURL: "https://www.ecartelera.com/carteles/2400/2425/002_m.jpg",
  //   },
  //   {
  //     id: '2',
  //     title: 'jurasi',
  //     rating: 3,
  //     description: ' Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque, ea architecto libero fugiat pariatur soluta, nostrum voluptates expedita inventore doloribus ipsa officiis optio itaque voluptate illo? Temporibus accusantium est necessitatibus!j',
  //     // imageURL: "https://cdn.shopify.com/s/files/1/0037/8008/3782/products/jurassic_park_advance_JC11660_C2_framed_18f65a21-f414-4407-b7bc-930200c6cd94.jpg?v=1596119558",
  //   },
  //   {
  //     id: '3',
  //     title: 'Pres',
  //     rating: 5,
  //     description: ' Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque, ea architecto libero fugiat pariatur soluta, nostrum voluptates expedita inventore doloribus ipsa officiis optio itaque voluptate illo? Temporibus accusantium est necessitatibus!j',
  //     // imageURL: "https://lh3.googleusercontent.com/-neONkpwIRCOM70Z2yV3s8B2k3pRhOJjnHQv2fKenL8DPYwh0OgkY6v_QYjRhpdw1rM",
  //   },
  //   {
  //     id: '4',
  //     title: 'Padrino',
  //     rating: 1,
  //     description: ' Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque, ea architecto libero fugiat pariatur soluta, nostrum voluptates expedita inventore doloribus ipsa officiis optio itaque voluptate illo? Temporibus accusantium est necessitatibus!j',
  //     // imageURL: "https://i.pinimg.com/originals/43/07/38/430738c35b952652f3372dd6c1a9aa59.jpg",
  //   },
  // ]

  constructor(platform: Platform) {
    this.platform = platform;
  }

  public async getSavedMovies() {
    // Retrieve cached photo array data
    const movieList = await Storage.get({ key: this.MOVIE_STORAGE });
    this.movies = JSON.parse(movieList.value) || [];

    if (!this.platform.is('hybrid')) {
      // Display the photo by reading into base64 format
      for (let movie of this.movies) {
        // Read each saved photo's data from the Filesystem
        const readFile = await Filesystem.readFile({
          path: movie.image.filepath,
          directory: FilesystemDirectory.Data
        });

        // Web platform only: Load the photo as base64 data
        movie.image.webviewPath = `data:image/jpeg;base64,${readFile.data}`;
      }
    }
  }

  getMovieById(movieId: string) {
    return {
      ...this.movies.find(movie => {
        return movie.id === movieId;
      })
    }
  }

  addMovie(title: string, rating: number, description: string, image: Image) {
    this.movies.push({
      title,
      rating,
      description,
      image,
      id: this.movies.length + 1 + ""
    });
    Storage.set({
      key: this.MOVIE_STORAGE,
      value: JSON.stringify(this.movies)
    });
  }

  async removeMovie(movieId: string) {
    const removing = this.movies.find(movie => {
      return movie.id = movieId;
    });

    const filename = removing.image.filepath.substr(removing.image.filepath.lastIndexOf('/') + 1);
    await Filesystem.deleteFile({
      path: filename,
      directory: FilesystemDirectory.Data
    })

    this.movies = this.movies.filter(movie => {
      return movie.id !== movieId
    });


    Storage.set({
      key: this.MOVIE_STORAGE,
      value: JSON.stringify(this.movies)
    });
  }

  private async readAsBase64(cameraPhoto: CameraPhoto) {
    // "hybrid" will detect Cordova or Capacitor
    if (this.platform.is('hybrid')) {
      // Read the file into base64 format
      const file = await Filesystem.readFile({
        path: cameraPhoto.path
      });

      return file.data;
    }
    else {
      // Fetch the photo, read as a blob, then convert to base64 format
      const response = await fetch(cameraPhoto.webPath);
      const blob = await response.blob();

      return await this.convertBlobToBase64(blob) as string;
    }
  }

  convertBlobToBase64 = (blob: Blob) => new Promise((resolve, reject) => {
    const reader = new FileReader;
    reader.onerror = reject;
    reader.onload = () => {
      resolve(reader.result);
    };
    reader.readAsDataURL(blob);
  });

  public async savePicture(cameraPhoto: CameraPhoto) {
    // Convert photo to base64 format, required by Filesystem API to save
    const base64Data = await this.readAsBase64(cameraPhoto);

    // Write the file to the data directory
    const fileName = new Date().getTime() + '.jpeg';
    const savedFile = await Filesystem.writeFile({
      path: fileName,
      data: base64Data,
      directory: FilesystemDirectory.Data
    });

    if (this.platform.is('hybrid')) {
      // Display the new image by rewriting the 'file://' path to HTTP
      // Details: https://ionicframework.com/docs/building/webview#file-protocol
      return {
        filepath: savedFile.uri,
        webviewPath: Capacitor.convertFileSrc(savedFile.uri),
      };
    }
    else {
      // Use webPath to display the new image instead of base64 since it's
      // already loaded into memory
      return {
        filepath: fileName,
        webviewPath: cameraPhoto.webPath
      };
    }
  }

  updateMovie(id: string, title: string, rating: number, description: string, image: Image) {

    console.log(id);


    const index = this.movies.findIndex(movie => { return movie.id === id });
    this.movies[index].title = title;
    this.movies[index].rating = rating;
    this.movies[index].description = description;
    this.movies[index].image = image;
  }


}
