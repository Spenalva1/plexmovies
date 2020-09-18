import { Injectable } from '@angular/core';
import { Movie } from './movie.model'

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  private movies: Movie[] = [
    {
      id: '1',
      title: 'Titanic',
      rating: 4,
      description: ' Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque, ea architecto libero fugiat pariatur soluta, nostrum voluptates expedita inventore doloribus ipsa officiis optio itaque voluptate illo? Temporibus accusantium est necessitatibus!j',
      imageURL: "https://www.ecartelera.com/carteles/2400/2425/002_m.jpg",
    },
    {
      id: '2',
      title: 'jurasi',
      rating: 3,
      description: ' Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque, ea architecto libero fugiat pariatur soluta, nostrum voluptates expedita inventore doloribus ipsa officiis optio itaque voluptate illo? Temporibus accusantium est necessitatibus!j',
      imageURL: "https://cdn.shopify.com/s/files/1/0037/8008/3782/products/jurassic_park_advance_JC11660_C2_framed_18f65a21-f414-4407-b7bc-930200c6cd94.jpg?v=1596119558",
    },
    {
      id: '3',
      title: 'Pres',
      rating: 5,
      description: ' Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque, ea architecto libero fugiat pariatur soluta, nostrum voluptates expedita inventore doloribus ipsa officiis optio itaque voluptate illo? Temporibus accusantium est necessitatibus!j',
      imageURL: "https://lh3.googleusercontent.com/-neONkpwIRCOM70Z2yV3s8B2k3pRhOJjnHQv2fKenL8DPYwh0OgkY6v_QYjRhpdw1rM",
    },
    {
      id: '4',
      title: 'Padrino',
      rating: 1,
      description: ' Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque, ea architecto libero fugiat pariatur soluta, nostrum voluptates expedita inventore doloribus ipsa officiis optio itaque voluptate illo? Temporibus accusantium est necessitatibus!j',
      imageURL: "https://i.pinimg.com/originals/43/07/38/430738c35b952652f3372dd6c1a9aa59.jpg",
    },
  ]

  constructor() { }

  getMovies() {
    return [...this.movies];
  }

  getMovieById(movieId: string) {
    return {
      ...this.movies.find(movie => {
        return movie.id === movieId;
      })
    }
  }

  addMovie(title: string, rating: number, description: string, imageURL: string) {
    this.movies.push({
      title,
      rating,
      description,
      imageURL,
      id: this.movies.length + 1 + ""
    });
  }

  removeMovie(movieId: string) {
    this.movies = this.movies.filter(movie => {
      return movie.id !== movieId
    })
  }

  updateMovie(id: string, title: string, rating: number, description: string, imageURL: string) {
    const index = this.movies.findIndex(movie => {
      return movie.id === id
    })
    this.movies[index].title = title;
    this.movies[index].rating = rating;
    this.movies[index].description = description;
    this.movies[index].imageURL = imageURL;
  }


}
