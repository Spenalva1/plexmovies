import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MoviesService } from '../movies.service';

@Component({
  selector: 'app-movie-add',
  templateUrl: './movie-add.page.html',
  styleUrls: ['./movie-add.page.scss'],
})
export class MovieAddPage implements OnInit {

  constructor(private moviesService: MoviesService, private router: Router) { }

  ngOnInit() {
  }

  saveNewPlace(title, rating, description, imageURL) {
    this.moviesService.addMovie(title.value, rating.value, description.value, imageURL.value);
    this.router.navigate(['/movies'])
  }
}
