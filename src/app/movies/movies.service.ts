import { Injectable } from '@angular/core';
import { Movie } from './movie.model'
import { Image } from '../image.model'
import {
  Plugins, Capacitor, FilesystemDirectory,
  CameraPhoto
} from '@capacitor/core';

const { Filesystem, Storage } = Plugins;

import { Platform } from '@ionic/angular';
import { ImageService } from '../image.service';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  public movies: Movie[] = [];
  private MOVIE_STORAGE: string = "movies";
  private platform: Platform;

  constructor(platform: Platform, private imageService: ImageService) {
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

  getMovieById(movieId: number) {
    return {
      ...this.movies.find(movie => {
        return movie.id === movieId;
      })
    }
  }

  addMovie(title: string, rating: number, description: string, image: Image) {
    const id = new Date().getTime();
    this.movies.push({
      title,
      rating,
      description,
      image,
      id: id,
    });
    Storage.set({
      key: this.MOVIE_STORAGE,
      value: JSON.stringify(this.movies)
    });
  }

  async removeMovie(movieId: number) {
    const removing = this.movies.find(movie => {
      return movie.id === movieId;
    });

    await this.imageService.removeImage(removing.image);

    this.movies = this.movies.filter(movie => {
      return movie.id !== movieId
    });

    Storage.set({
      key: this.MOVIE_STORAGE,
      value: JSON.stringify(this.movies)
    });
  }

  updateMovie(id: number, title: string, rating: number, description: string, image: Image) {
    const index = this.movies.findIndex(movie => { return movie.id === id });
    this.movies[index].title = title;
    this.movies[index].rating = rating;
    this.movies[index].description = description;
    this.movies[index].image = image;
    Storage.set({
      key: this.MOVIE_STORAGE,
      value: JSON.stringify(this.movies)
    });
  }


}
